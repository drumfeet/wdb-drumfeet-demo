const WeaveDB = require("weavedb-sdk")

export default function Home() {
  const addCron = async () => {
    const db = new WeaveDB({
      contractTxId: "_bCWkv6MAlthbaJ9v2CNxHzgXfDR93dXeSEv8IE3M0w",
    })
    await db.init()

    const cron = {
      span: 60 * 60,
      do: true,
      jobs: [["upsert", [{ times: db.inc(2) }, "conf", "count-crons"]]],
      // jobs: [["set", [{ name: "Bob", age: 20 }, "people", "Bob"]]],
    }
    const tx = await db.addCron(cron, "count-crons")
    console.log("tx", tx)

    console.log(await db.getCrons())
  }
  return (
    <>
      <button onClick={addCron}>addCron</button>
    </>
  )
}
