const { WarpFactory } = require("warp-contracts")
const fs = require("fs")

// reference: https://academy.warp.cc/docs/sdk/basic/contract-methods

async function readState() {
  const privateKeyFile = ".wallets/wallet-mainnet.json"
  const adminWallet = JSON.parse(fs.readFileSync(privateKeyFile).toString())

  const warp = WarpFactory.forMainnet()
  const contract = warp
    .contract("fZ4eN2HJ-iGVPFDHZ9Vy7H5y8wtCSbmi8XXB0oBPQME")
    .connect(adminWallet)
    .setEvaluationOptions({
      allowBigInt: true,
    })
  const { sortKey, cachedValue } = await contract.readState()
  console.log("sortKey", sortKey)
  console.log("cachedValue", cachedValue)
}

async function viewState() {
  const privateKeyFile = ".wallets/wallet-mainnet.json"
  const adminWallet = JSON.parse(fs.readFileSync(privateKeyFile).toString())

  const warp = WarpFactory.forMainnet()
  const contract = warp
    .contract("fZ4eN2HJ-iGVPFDHZ9Vy7H5y8wtCSbmi8XXB0oBPQME")
    .connect(adminWallet)
    .setEvaluationOptions({
      allowBigInt: true,
    })
  const { result } = await contract.viewState({
    function: "get",
  })
  console.log("result", result)
}

async function writeInteraction() {
  const privateKeyFile = ".wallets/wallet-mainnet.json"
  const adminWallet = JSON.parse(fs.readFileSync(privateKeyFile).toString())

  const warp = WarpFactory.forMainnet()
  const contract = warp
    .contract("fZ4eN2HJ-iGVPFDHZ9Vy7H5y8wtCSbmi8XXB0oBPQME")
    .connect(adminWallet)

  const result = await contract.writeInteraction({
    function: "add",
    query: [{ name: "Bob", age: 20 }, "people"],
  })
  console.log("result", result)
}

readState()
// viewState()
// writeInteraction()
