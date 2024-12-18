const WeaveDB = require("weavedb-sdk-node")

const CONTRACT_TX_ID = "Hta_2gK02gkuA006mPvGInddYvQAWKbOR4_RpGbRw90"

async function main() {
  const db = new WeaveDB({ contractTxId: CONTRACT_TX_ID })
  await db.init()

  const result = await db.listCollections()
  console.log("result", result)
  process.exit(0)
}

async function batch() {
  const db = new WeaveDB({ contractTxId: CONTRACT_TX_ID })
  await db.init()
}

async function test() {
  try {
    const db = new WeaveDB({
      contractTxId: "KaNgKg52WoIeMzymWyydOYej5C_cy7dqjc3Ue6GWTqs",
    })
    await db.init()
    const targetCollections = await db.listCollections()
    console.log('targetCollections', targetCollections)
    
    // const result = await db.cget("exchange_metrics")
    // console.log("result", result)
  } catch (e) {
    console.error(e)
  }
}

// main()
// batch()
test()
