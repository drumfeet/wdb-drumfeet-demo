import WeaveDB from "weavedb-sdk"

export default function Home() {
  const CONTRACT_TX_ID = "FUvaUwJus4gZUids_4Pgv15Vgj-lpu3EwPvuqzeXQx0"
  const COLLECTION_NAME = "sample12"

  const start = async () => {
    try {
      const db = new WeaveDB({
        contractTxId: CONTRACT_TX_ID,
      })
      await db.init()

      const result = await db.cget(
        COLLECTION_NAME
      )
      console.log("result", result)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <button onClick={start}>Start</button>
    </>
  )
}