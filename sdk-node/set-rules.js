const WeaveDB = require("weavedb-sdk-node")
require("dotenv").config()

const CONTRACT_TX_ID = "wlopNqrWLbkA9jNtjhcmZ3TNM3SlurnTd2_peU7yASI"
const COLLECTION_NAME = "sample"

const EVM_WALLET_ADDRESS = process.env.EVM_WALLET_ADDRESS.toLowerCase()
const EVM_PRIVATE_KEY = Buffer.from(process.env.EVM_PRIVATE_KEY, "hex")

const wallet = {
  getAddressString: () => EVM_WALLET_ADDRESS,
  getPrivateKey: () => EVM_PRIVATE_KEY,
}

async function main() {
  try {
    const db = new WeaveDB({ contractTxId: CONTRACT_TX_ID })
    await db.init()
    db.setDefaultWallet(wallet, "evm")
    await db.setRules({ "allow write": true }, COLLECTION_NAME)
    console.log("done")
  } catch (error) {
    console.error("An error occurred:", error)
  } finally {
    process.exit(0)
  }
}

main()
