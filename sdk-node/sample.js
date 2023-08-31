const WeaveDB = require("weavedb-sdk-node")
require("dotenv").config()

const CONTRACT_TX_ID = "W00EhrAHqD2CxLd81N8yyCOOK0xtPTtfKIQEZGzKabU"
const COLLECTION_NAME = "tasks"

const EVM_WALLET_ADDRESS = process.env.EVM_WALLET_ADDRESS.toLowerCase()
const EVM_PRIVATE_KEY = Buffer.from(process.env.EVM_PRIVATE_KEY, "hex")

const wallet = {
  getAddressString: () => EVM_WALLET_ADDRESS,
  getPrivateKey: () => EVM_PRIVATE_KEY,
}

async function addTask(db) {
  const task = {
    task: "Hey! I'm a task",
    date: db.ts(),
    user_address: db.signer(),
    done: false,
  }

  const tx = await db.add(task, COLLECTION_NAME)
  console.log("Transaction:", tx)

  const result = await tx.getResult()
  console.log("Result:", result)
}

async function main() {
  try {
    const db = new WeaveDB({ contractTxId: CONTRACT_TX_ID })
    await db.init()
    db.setDefaultWallet(wallet, "evm")

    await addTask(db)
  } catch (error) {
    console.error("An error occurred:", error)
  } finally {
    process.exit(0)
  }
}

main()
