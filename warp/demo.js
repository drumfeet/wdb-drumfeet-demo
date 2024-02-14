const { WarpFactory } = require("warp-contracts")
const fs = require("fs")

async function main() {
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

main()
