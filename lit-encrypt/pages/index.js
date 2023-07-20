import { useEffect, useState } from "react"
import SDK from "weavedb-sdk"

export default function Home() {
  //Replace contractTxId string value with the contractTxId when deploying the WeaveDB contract.
  const contractTxId = "W00EhrAHqD2CxLd81N8yyCOOK0xtPTtfKIQEZGzKabU"
  // Replace COLLECTION_NAME string value with the name of your collection. For this example, we have set people as our collection name.
  const COLLECTION_NAME = "messages"
  // State variable storing the weavedb-sdk object
  const [db, setDb] = useState(null)
  // State variable storing a boolean value indicating whether database initialization is complete.
  const [initDb, setInitDb] = useState(false)
  const [lit, setLit] = useState(null)
  const [messages, setMessages] = useState([])
  const [msg, setMsg] = useState()
  // State variable storing the doc id of the message to be decrypted
  const [docId, setDocId] = useState()

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
      const tx = await db.add(
        { date: db.ts(), user_address: db.signer(), message: msg },
        COLLECTION_NAME
      )
      console.log("tx", tx)
    } catch (e) {
      console.error("addMsg", e)
    }
  }

  const decryptMsg = async () => {
    try {
      console.log("docId", docId)
    } catch (e) {
      console.error("addMsg", e)
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
        <label>Message</label>
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
        <label>Doc ID</label>
        <input
          placeholder="Doc ID"
          value={docId}
          onChange={(e) => setDocId(e.target.value)}
        />
        <br />
        <button onClick={decryptMsg}>Decrypt Message</button>
        <br />
        <br />
      </div>
    </>
  )
}
