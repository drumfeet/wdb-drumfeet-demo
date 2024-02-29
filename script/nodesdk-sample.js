import SDK_NODE from "weavedb-sdk-node"
import fs from "fs"

const COLLECTION_NAME = "sample"
const contractTxId = "e3RyM9TN4_8nJC_lPofpA3aWi6Zh_7rthom-aiWwBJw"

const privateKeyFile = ".wallets/wallet-mainnet.json"
const adminWallet = JSON.parse(fs.readFileSync(privateKeyFile).toString())

const db = new SDK_NODE({
  contractTxId: contractTxId,
})
await db.initializeWithoutWallet()
db.setDefaultWallet(adminWallet, "ar")

const rules = {
  "allow write": true,
}

let result
try {
  result = await db.setRules(rules, COLLECTION_NAME)
  console.log("setRules", result.success)

  process.exit()
} catch (e) {
  console.log(e)
}