const { WarpFactory } = require("warp-contracts")
const fs = require("fs")

const main = async () => {
  const arweaveKeyFile = ".wallets/wallet-mainnet.json"
  const adminWallet = JSON.parse(fs.readFileSync(arweaveKeyFile).toString())

  const warp = WarpFactory.forMainnet()
  const contract = warp
    .contract("fZ4eN2HJ-iGVPFDHZ9Vy7H5y8wtCSbmi8XXB0oBPQME")
    .connect(adminWallet)
    .setEvaluationOptions({
      allowBigInt: true,
    })
  const { sortKey, cachedValue } = await contract.readState()
}
main()
