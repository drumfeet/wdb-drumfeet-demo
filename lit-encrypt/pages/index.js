import { useEffect, useState } from "react"
import SDK from "weavedb-sdk"
import LitJsSdk from "@lit-protocol/sdk-browser"
import { isNil } from "ramda"
import { ethers } from "ethers"
import lf from "localforage"

export default function Home() {
  const contractTxId = "Sdnmc2t_yTukH34oFmVxj-i0cDw80Tmi7rz5nyPnJn4"
  const COLLECTION_NAME = "messages"

  // State variable storing the weavedb-sdk object
  const [db, setDb] = useState(null)
  // State variable storing a boolean value indicating whether database initialization is complete.
  const [initDb, setInitDb] = useState(false)
  const [user, setUser] = useState(null)

  const [msg, setMsg] = useState("")
  const [docId, setDocId] = useState("")
  const [decryptedMsg, setDecryptedMsg] = useState()
  // State variable storing an array of people data
  const [messages, setMessages] = useState([])

  const checkUser = async () => {
    const wallet_address = await lf.getItem(`temp_address:current`)
    if (!isNil(wallet_address)) {
      const identity = await lf.getItem(
        `temp_address:${contractTxId}:${wallet_address}`
      )
      if (!isNil(identity)) {
        setUser({
          wallet: wallet_address,
          privateKey: identity.privateKey,
        })
      }
    }
  }

  const login = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum, "any")
    const signer = await provider.getSigner()
    await provider.send("eth_requestAccounts", [])
    const wallet_address = await signer.getAddress()
    let identity = await lf.getItem(
      `temp_address:${contractTxId}:${wallet_address}`
    )

    let tx
    let err
    if (isNil(identity)) {
      ;({ tx, identity, err } = await db.createTempAddress(wallet_address))
      const linked = await db.getAddressLink(identity.address)
      if (isNil(linked)) {
        alert("something went wrong")
        return
      }
    } else {
      await lf.setItem("temp_address:current", wallet_address)

      setUser({
        wallet: wallet_address,
        privateKey: identity.privateKey,
      })
      return
    }
    if (!isNil(tx) && isNil(tx.err)) {
      identity.tx = tx
      identity.linked_address = wallet_address
      await lf.setItem("temp_address:current", wallet_address)
      await lf.setItem(
        `temp_address:${contractTxId}:${wallet_address}`,
        JSON.parse(JSON.stringify(identity))
      )
      setUser({
        wallet: wallet_address,
        privateKey: identity.privateKey,
      })
    }
  }

  const logout = async () => {
    await lf.removeItem("temp_address:current")
    setUser(null, "temp_current")
    console.log("<<logout()")
  }

  const setupWeaveDB = async () => {
    try {
      const _db = new SDK({
        contractTxId: contractTxId,
      })
      await _db.init()
      setDb(_db)
      setInitDb(true)
    } catch (e) {
      console.error("setupWeaveDB", e)
    }
  }

  const addMsg = async () => {
    try {
      const lit = new LitJsSdk.LitNodeClient()
      await lit.connect()

      const authSig = await LitJsSdk.checkAndSignAuthMessage({
        chain: "polygon",
      })

      const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
        msg
      )

      // more examples at: https://developer.litprotocol.com/accessControl/EVM/basicExamples#a-specific-wallet-address
      const accessControlConditions = [
        {
          contractAddress: "",
          standardContractType: "",
          chain: "polygon",
          method: "",
          parameters: [":userAddress"],
          returnValueTest: {
            comparator: "=",
            value: user.wallet,
          },
        },
      ]

      const encryptedSymmetricKey = await lit.saveEncryptionKey({
        accessControlConditions,
        authSig,
        chain: "polygon",
        symmetricKey,
      })
      const blobToDataURI = (blob) => {
        return new Promise((resolve, reject) => {
          var reader = new FileReader()

          reader.onload = (e) => {
            var data = e.target.result
            resolve(data)
          }
          reader.readAsDataURL(blob)
        })
      }
      const encryptedData = await blobToDataURI(encryptedString)

      // store encryption info in weavedb
      const tx = await db.add(
        {
          date: db.ts(),
          user_address: db.signer(),
          encryptedData: encryptedData,
          encryptedSymmetricKey: LitJsSdk.uint8arrayToString(
            encryptedSymmetricKey,
            "base16"
          ),
          accessControlConditions: accessControlConditions,
        },
        COLLECTION_NAME,
        user
      )
      console.log("tx", tx)

      console.log("result", await tx.getResult())
      getMessages()
    } catch (e) {
      console.error("addMsg", e)
    }
  }

  const decryptMsg = async () => {
    // retrieve specific document from your collection, then lit protocol will validate your encryption key and accessControlConditions to decrypt the data requested

    try {
      const document = await db.get(COLLECTION_NAME, docId)
      console.log("document", document)

      const lit = new LitJsSdk.LitNodeClient()
      await lit.connect()

      const { encryptedData, encryptedSymmetricKey, accessControlConditions } =
        document

      const authSig = await LitJsSdk.checkAndSignAuthMessage({
        chain: "polygon",
      })

      const symmetricKey = await lit.getEncryptionKey({
        accessControlConditions,
        toDecrypt: encryptedSymmetricKey,
        chain: "polygon",
        authSig,
      })

      const dataURItoBlob = (dataURI) => {
        var byteString = window.atob(dataURI.split(",")[1])
        var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]
        var ab = new ArrayBuffer(byteString.length)
        var ia = new Uint8Array(ab)
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
        }

        var blob = new Blob([ab], { type: mimeString })

        return blob
      }

      const decryptedString = await LitJsSdk.decryptString(
        dataURItoBlob(encryptedData),
        symmetricKey
      )
      console.log("decryptedString", decryptedString)
      setDecryptedMsg(decryptedString)
    } catch (e) {
      console.error("decryptMsg", e)
    }
  }

  const getMessages = async () => {
    try {
      const _messages = await db.cget(COLLECTION_NAME)
      console.log("getMessages", _messages)
      setMessages(_messages)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    checkUser()
    setupWeaveDB()
  }, [])

  useEffect(() => {
    if (initDb) {
      getMessages()
    }
  }, [initDb])

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <br />
        <br />
        {!isNil(user) ? (
          <button onClick={logout}>
            {user.wallet.slice(0, 5)}...{user.wallet.slice(-5)}
          </button>
        ) : (
          <button onClick={login}>Login</button>
        )}
        <br /> <br />
        <br /> <br />
        <label title="message you want to encrypt">Message</label>
        <input
          placeholder="Message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <br />
        <button onClick={addMsg}>Add Message</button>
        <br />
        <br />
        <br /> <br />
        <label title="id of the document you want to get from the collection">
          Doc ID
        </label>
        <input
          placeholder="Doc ID"
          value={docId}
          onChange={(e) => setDocId(e.target.value)}
        />
        <br />
        <button onClick={decryptMsg}>Decrypt Message</button>
        <br />
        <br />
        {decryptedMsg ? "decryptedMsg is : " + decryptedMsg : ""}
        <br />
        <br />
        <br />
        <br />
        <table cellPadding="18px" cellSpacing={"28px"}>
          <thead>
            <tr align="left">
              <th>Doc ID</th>
              <th>User Address</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.data.user_address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
