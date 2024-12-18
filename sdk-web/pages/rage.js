const WeaveDB = require("weavedb-sdk")

const CONTRACT_TX_ID = "Hta_2gK02gkuA006mPvGInddYvQAWKbOR4_RpGbRw90"
const COLLECTION_NAME = "test"

export default function Home() {
  const rage = async () => {
    try {
      const db = new WeaveDB({
        contractTxId: "KaNgKg52WoIeMzymWyydOYej5C_cy7dqjc3Ue6GWTqs",
      })
      await db.init()

      const targetCollections = await db.listCollections()
      console.log("targetCollections", targetCollections)

      // const result = await db.get("exchange_metrics")
      // console.log("result", result)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <button onClick={rage}>Rage</button>
    </>
  )
}
