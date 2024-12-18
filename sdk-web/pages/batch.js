const WeaveDB = require("weavedb-sdk")

const CONTRACT_TX_ID = "Hta_2gK02gkuA006mPvGInddYvQAWKbOR4_RpGbRw90"
const COLLECTION_NAME = "test"

export default function Home() {
  const start = async () => {
    try {
      const db = new WeaveDB({
        contractTxId: CONTRACT_TX_ID,
      })
      await db.init()

      const result = await db.batch([
        ["set", { name: "Bob" }, COLLECTION_NAME, "Bob"],
        ["upsert", { name: "Alice" }, COLLECTION_NAME, "Alice"],
      ])
      console.log("result", result)
    } catch (e) {
      console.error(e)
    }
  }

  const add = async () => {
    try {
      const db = new WeaveDB({
        contractTxId: CONTRACT_TX_ID,
      })
      await db.init()
      // db.setDefaultWallet((privateKey = "REPLACE_THIS"), "evm")

      const result = await db.upsert({ name: "Bob2" }, COLLECTION_NAME, "Bob2")
      console.log("result", result)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <button onClick={start}>Start</button>
      <br />
      <br />
      <button onClick={add}>Add</button>
    </>
  )
}
