const WeaveDB = require("weavedb-sdk-node")

async function main() {
  const db = new WeaveDB({
    // contractTxId: "1xRzLJV9vrm8t2djb5jveyz9Ikt-ZTLIBk_swvhxJ54",
    // contractTxId: "rmbQY4BVMCJPSERyv1MZSpCWdLFMTjP2_lrJYCa7PAo",
    contractTxId: "_bCWkv6MAlthbaJ9v2CNxHzgXfDR93dXeSEv8IE3M0w",
  })
  await db.init()

  const cron = {
    span: 60 * 60,
    do: true,
    jobs: [["upsert", [{ times: db.inc(2) }, "conf", "count-crons"]]],
    // jobs: [["set", [{ name: "Bob", age: 20 }, "people", "Bob"]]],
  }
  const tx = await db.addCron(cron, "count-crons", { privateKey: "" })
  console.log("tx", tx)

  console.log(await db.getCrons())
}

main()
