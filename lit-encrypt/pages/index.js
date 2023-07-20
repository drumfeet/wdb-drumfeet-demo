import { useEffect, useState } from "react"
import SDK from "weavedb-sdk"
import LitJsSdk from "@lit-protocol/sdk-browser"

export default function Home() {
  const contractTxId = "Sdnmc2t_yTukH34oFmVxj-i0cDw80Tmi7rz5nyPnJn4"
  const COLLECTION_NAME = "messages"

  // State variable storing the weavedb-sdk object
  const [db, setDb] = useState(null)
  // State variable storing a boolean value indicating whether database initialization is complete.
  const [initDb, setInitDb] = useState(false)

  const [msg, setMsg] = useState("")
  const [docId, setDocId] = useState("")
  const [decryptedMsg, setDecryptedMsg] = useState()

  // more examples at: https://developer.litprotocol.com/accessControl/EVM/basicExamples#a-specific-wallet-address
  const accessControlConditions = [
    {
      contractAddress: "0x0000000000000000000000000000000000001010",
      standardContractType: "ERC20",
      chain: "polygon",
      method: "balanceOf",
      parameters: [":userAddress"],
      returnValueTest: {
        comparator: ">=",
        value: "0",
      },
    },
  ]

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
        COLLECTION_NAME
      )
      console.log("tx", tx)
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

  useEffect(() => {
    setupWeaveDB()
  }, [])

  useEffect(() => {
    if (initDb) {
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
        {decryptedMsg ? decryptedMsg : ""}
        <br />
        <br />
      </div>
    </>
  )
}
