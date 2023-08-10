const WeaveDB = require("weavedb-sdk-node")
const fs = require("fs")

const COLLECTION_NAME = "sample"
const contractTxId = "h7V-UiqNCJbbXo8CEirs7wd0cZ1HgePy3HksSQ_8NKU"

const privateKeyFile = "wallet-mainnet.json"
const adminWallet = JSON.parse(fs.readFileSync(privateKeyFile).toString())

const main = async () => {
  const db = new WeaveDB({
    contractTxId,
  })

  await db.init()
  db.setDefaultWallet(adminWallet, "ar")

  const rules = {
    "allow write": true,
  }

  let result
  try {
    result = await db.setRules(rules, COLLECTION_NAME)
    console.log("setRules", result)
  } catch (e) {
    console.log(e)
  }

  process.exit()
}

main()
