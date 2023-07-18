const WeaveDB = require("weavedb-sdk-node")
require("dotenv").config()

const contractTxId = "W00EhrAHqD2CxLd81N8yyCOOK0xtPTtfKIQEZGzKabU"
const COLLECTION_NAME = "tasks"

const evmWalletAddress = process.env.EVM_WALLET_ADDRESS
const evmPrivateKey = process.env.EVM_PRIVATE_KEY

const wallet = {
  getAddressString: () => evmWalletAddress.toLowerCase(),
  getPrivateKey: () => Buffer.from(evmPrivateKey, "hex"),
}

async function main() {
  try {
    const db = new WeaveDB({ contractTxId })
    await db.init()
    db.setDefaultWallet(wallet, "evm")

    const task = {
      task: "Hey! I'm a task",
      date: db.ts(),
      user_address: db.signer(),
      done: false,
    }
    const tx = await db.add(task, COLLECTION_NAME)
    console.log("tx", tx)
    const result = await tx.getResult()
    console.log("result", result)
  } catch (e) {
    console.error("catch", e)
  } finally {
    process.exit(0)
  }
}

main()
