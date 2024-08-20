const { WarpFactory } = require("warp-contracts")
const fs = require("fs")

// reference: https://academy.warp.cc/docs/sdk/basic/contract-methods

// const CONTRACT_TX_ID = "fZ4eN2HJ-iGVPFDHZ9Vy7H5y8wtCSbmi8XXB0oBPQME"
// const CONTRACT_TX_ID = "U0zLRzozZxrRNCAB724rzoLU4fo-2cF5BTD-HYuDLxk"
// const CONTRACT_TX_ID = "3gjEmCSLYwRyxJF9wocWtkOYWkqRU2Y-uzaCVsqoqX0" //useKVStorage = true
// const CONTRACT_TX_ID ="wtKjXNADY7n2tb26yWyAiSKjPwVLTB0ixPQHzCmNobc" //useKVStorage = false
const CONTRACT_TX_ID = "9a154Y2MukgsqqnY54BDEcmTLnRk-3bKPT0cK4Dk4A8"

async function readState() {
  const privateKeyFile = ".wallets/wallet-mainnet.json"
  const adminWallet = JSON.parse(fs.readFileSync(privateKeyFile).toString())

  const warp = WarpFactory.forMainnet()
  const contract = warp
    .contract(CONTRACT_TX_ID)
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
    .contract(CONTRACT_TX_ID)
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
  console.log("adminWallet", adminWallet)

  const warp = WarpFactory.forMainnet()
  const contract = warp
    .contract(CONTRACT_TX_ID)
    .connect(adminWallet)

  const result = await contract.writeInteraction({
    function: "setRules",
    query: [{ "allow write": true }, "people"],
  })
  console.log("result", result)
}

// readState()
// viewState()
writeInteraction()
