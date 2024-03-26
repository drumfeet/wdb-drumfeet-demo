const WeaveDB = require("weavedb-sdk-node")
const fs = require("fs")

const CONTRACT_TX_ID = "s4GQEpXxdbS91rMoCZi6_Mdt6zTLW_22xAMFjgTGbio"
const COLLECTION_NAME = "posts"
const privateKeyFile = ".wallets/wallet-mainnet.json"
const adminWallet = JSON.parse(fs.readFileSync(privateKeyFile).toString())

async function main() {
  try {
    const db = new WeaveDB({ contractTxId: CONTRACT_TX_ID })
    await db.init()

    db.setDefaultWallet(adminWallet, "ar")

    //Error occurs: only bundle queries are allowed

    // const tx = await db.add({ body: "sample test" }, "posts")
    // console.log("tx", tx)

    // const tx2 = await db.query(
    //   "add:post",
    //   { body: "hello world" },
    //   COLLECTION_NAME
    // )
    // console.log("tx2", tx2)

    // const query1 = await db.sign("add", { body: "Bob" }, COLLECTION_NAME)
    // console.log("query1", query1)

    // const tx3 = await db.bundle([query1])
    // console.log("tx3", tx3)

    const result = await db.cget(COLLECTION_NAME)
    console.log(result)
  } catch (error) {
    console.error("An error occurred:", error)
  } finally {
    process.exit(0)
  }
}

main()
