import SDK_NODE from "weavedb-sdk-node"
import fs from "fs"

const COLLECTION_NAME = "sample"
const contractTxId = "XJFyEN-61isGjMX19E2uBMQ-kLFwOGE6RBFM5KoPQPI"

const privateKeyFile = "wallet-mainnet.json"
const adminWallet = JSON.parse(fs.readFileSync(privateKeyFile).toString())

const sdk = new SDK_NODE({
  contractTxId: contractTxId,
  arweave_wallet: adminWallet,
})
sdk.initialize({ wallet: adminWallet })

const schema = {
  type: "object",
  required: ["article_id", "date", "user_address"],
  properties: {
    article_id: {
      type: "string",
    },
    user_address: {
      type: "string",
    },
    date: {
      type: "number",
    },
  },
}

const rules = {
  "allow write": true,
}

let result
try {
  result = await sdk.setSchema(schema, COLLECTION_NAME)
  console.log("setSchema", result.success)

  result = await sdk.setRules(rules, COLLECTION_NAME)
  console.log("setRules", result.success)

  process.exit()
} catch (e) {
  console.log(e)
}
