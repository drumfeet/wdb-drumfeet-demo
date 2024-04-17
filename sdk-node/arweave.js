const WeaveDB = require("weavedb-sdk-node")
const fs = require("fs")

const COLLECTION_NAME = "sample2"
const contractTxId = "EY1ykbYVJcCBlIXd_pkypJgcc2cOB0ek_wPL10BC3Ds"

const privateKeyFile = ".wallets/wallet-mainnet.json"
const adminWallet = JSON.parse(fs.readFileSync(privateKeyFile).toString())

const main = async () => {
  const db = new WeaveDB({
    contractTxId,
    nocache: true,
  })

  await db.init()
  db.setDefaultWallet(adminWallet, "ar")

  const rules = {
    "allow write": true,
  }

  let result
  try {
    result = await db.setRules(rules, COLLECTION_NAME)
    console.log("setRules", result)
  } catch (e) {
    console.log(e)
  }

  process.exit()
}

main()
