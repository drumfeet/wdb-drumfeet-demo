const WeaveDB = require("weavedb-sdk-node")
require("dotenv").config()

const CONTRACT_TX_ID = "wlopNqrWLbkA9jNtjhcmZ3TNM3SlurnTd2_peU7yASI"
const COLLECTION_NAME = "people"

const EVM_WALLET_ADDRESS = process.env.EVM_WALLET_ADDRESS.toLowerCase()
const EVM_PRIVATE_KEY = Buffer.from(process.env.EVM_PRIVATE_KEY, "hex")
const EVM_WALLET_ADDRESS1 = process.env.EVM_WALLET_ADDRESS1.toLowerCase()
const EVM_PRIVATE_KEY1 = Buffer.from(process.env.EVM_PRIVATE_KEY1, "hex")
const EVM_WALLET_ADDRESS2 = process.env.EVM_WALLET_ADDRESS2.toLowerCase()
const EVM_PRIVATE_KEY2 = Buffer.from(process.env.EVM_PRIVATE_KEY2, "hex")
const EVM_WALLET_ADDRESS3 = process.env.EVM_WALLET_ADDRESS3.toLowerCase()
const EVM_PRIVATE_KEY3 = Buffer.from(process.env.EVM_PRIVATE_KEY3, "hex")

const wallet = {
  getAddressString: () => EVM_WALLET_ADDRESS,
  getPrivateKey: () => EVM_PRIVATE_KEY,
}

const wallet1 = {
  getAddressString: () => EVM_WALLET_ADDRESS1,
  getPrivateKey: () => EVM_PRIVATE_KEY1,
}

const wallet2 = {
  getAddressString: () => EVM_WALLET_ADDRESS2,
  getPrivateKey: () => EVM_PRIVATE_KEY2,
}

const wallet3 = {
  getAddressString: () => EVM_WALLET_ADDRESS3,
  getPrivateKey: () => EVM_PRIVATE_KEY3,
}

async function main() {
  try {
    const db = new WeaveDB({ contractTxId: CONTRACT_TX_ID })
    await db.init()
    db.setDefaultWallet(wallet, "evm")

    const query1 = await db.sign("set", { name: "Bob" }, "people", "Bob", {
      evm: wallet1,
    })
    const query2 = await db.sign("set", { name: "Alice" }, "people", "Alice", {
      evm: wallet2,
    })
    const query3 = await db.sign("set", { name: "Beth" }, "people", "Beth", {
      evm: wallet3,
    })

    await db.bundle([query1, query2, query3], { evm: wallet })

    console.log("done")
  } catch (error) {
    console.error("An error occurred:", error)
  } finally {
    process.exit(0)
  }
}

main()
