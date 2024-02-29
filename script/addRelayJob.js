import SDK_NODE from "weavedb-sdk-node"
import fs from "fs"

const contractTxId = "e3RyM9TN4_8nJC_lPofpA3aWi6Zh_7rthom-aiWwBJw"

const privateKeyFile = ".wallets/wallet-mainnet.json"
const adminWallet = JSON.parse(fs.readFileSync(privateKeyFile).toString())

const sdk = new SDK_NODE({
  contractTxId: contractTxId,
})
await sdk.initializeWithoutWallet()

const job = {
  relayers: ["0x4e79fd1Ba59111b17817093AE36E812990A2634a"],
    schema: {
      type: "number",
    },
}

let result
try {
  result = await sdk.addRelayerJob("jobID", job, {ar: adminWallet})
  console.log("addRelayerJob", result)

  process.exit()
} catch (e) {
  console.log(e)
}
