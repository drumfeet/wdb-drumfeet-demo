import SDK_NODE from "weavedb-sdk-node"
import fs from "fs"

// const contractTxId = "XJFyEN-61isGjMX19E2uBMQ-kLFwOGE6RBFM5KoPQPI"
const contractTxId = "e3RyM9TN4_8nJC_lPofpA3aWi6Zh_7rthom-aiWwBJw"

const privateKeyFile = "wallet-mainnet.json"
const adminWallet = JSON.parse(fs.readFileSync(privateKeyFile).toString())

const sdk = new SDK_NODE({
  contractTxId: contractTxId,
  arweave_wallet: adminWallet,
})
sdk.initialize({ wallet: adminWallet })

const job = {
  relayers: ["0x4e79fd1Ba59111b17817093AE36E812990A2634a"],
    schema: {
      type: "number",
    },
}

const schema = {
  type: "object",
  required: ["height"],
  properties: { height: { type: "number" } },
}
const relayers = ["0x4e79fd1Ba59111b17817093AE36E812990A2634a"]

let result
try {
  result = await sdk.addRelayerJob("jobID", job, {ar: adminWallet})
  console.log("addRelayerJob", result)

  process.exit()
} catch (e) {
  console.log(e)
}
