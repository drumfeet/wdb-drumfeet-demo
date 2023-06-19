import SDK_NODE from "weavedb-sdk-node"
import fs from "fs"

const COLLECTION_NAME = "sample"
const contractTxId = "e3RyM9TN4_8nJC_lPofpA3aWi6Zh_7rthom-aiWwBJw"

const privateKeyFile = "wallet-mainnet.json"
const adminWallet = JSON.parse(fs.readFileSync(privateKeyFile).toString())

const sdk = new SDK_NODE({
  contractTxId: contractTxId,
  arweave_wallet: adminWallet,
})
sdk.initialize({ wallet: adminWallet })

const schema = {
  type: "object",
  required: [],
  properties: {
    user_address: {
      type: "string",
    },
    date: {
      type: "number",
    },
  },
}

// const schema = {
//   "type": "object",
//   "required": [],
//   "properties": {}
// }

const rules = {
  "allow write": true,
}

const job = {
  relayers: [],
  schema: {
    type: "number",
  },
}

let result
try {
  result = await sdk.setSchema(schema, COLLECTION_NAME)
  console.log("setSchema", result)

  // result = await sdk.setRules(rules, COLLECTION_NAME)
  // console.log("setRules", result.success)

  // result = await sdk.addRelayerJob("test", job)
  // console.log("addRelayerJob", result)

  process.exit()
} catch (e) {
  console.log(e)
}
