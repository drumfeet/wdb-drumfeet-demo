const WeaveDB = require("weavedb-sdk-node")

const CONTRACT_TX_ID = "0M4qTPqFTxKpfe2uPeimYTEFV3VImL8nSZD3Az7g5Iw"
const COLLECTION_NAME = "coas_nftcanvases"

async function main() {
  const db = new WeaveDB({ contractTxId: CONTRACT_TX_ID })
  await db.init()

  const result = await db.get(COLLECTION_NAME)
  console.log("result", result)
  process.exit(0)
}

main()
