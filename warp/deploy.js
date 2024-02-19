const { WarpFactory } = require("warp-contracts")
const { DeployPlugin, ArweaveSigner } = require("warp-contracts-plugin-deploy")
const fs = require("fs")

// reference: https://academy.warp.cc/docs/sdk/advanced/plugins/deployment#deployment-methods

async function deployFromSourceTx() {
  const initialState1 = {
    messages: [],
  }

  const initialState = {
    version: "0.26.5",
    canEvolve: true,
    evolve: null,
    secure: true,
    data: {},
    nonces: {},
    ids: {},
    indexes: {},
    auth: {
      algorithms: ["secp256k1", "secp256k1-2", "ed25519", "rsa256"],
      name: "weavedb",
      version: "1",
      links: {},
    },
    crons: {
      lastExecuted: 0,
      crons: {},
    },
    contracts: {},
    relayers: {},
  }

  const privateKeyFile = ".wallets/wallet-mainnet.json"
  const adminWallet = JSON.parse(fs.readFileSync(privateKeyFile).toString())

  const warp = WarpFactory.forMainnet().use(new DeployPlugin())

  const { contractTxId } = await warp.createContract.deployFromSourceTx({
    wallet: new ArweaveSigner(adminWallet),
    initState: JSON.stringify(initialState),
    srcTxId: "1pFdmXngB5A4TXvD1cHEGNVpqdEJBYjXSmSyvy6MQiQ", // contract v0.26.5
    evaluationManifest: { evaluationOptions: { useKVStorage: true } },
  })
  console.log("contractTxId", contractTxId)
}

async function deploy() {
  const warp = WarpFactory.forMainnet().use(new DeployPlugin())

  const contractSrc = fs.readFileSync("./ardit/contracts/contract.js", "utf8")

  const initialState = {
    messages: [],
  }

  const privateKeyFile = ".wallets/wallet-mainnet.json"
  const adminWallet = JSON.parse(fs.readFileSync(privateKeyFile).toString())

  const { contractTxId } = await warp.createContract.deploy({
    wallet: new ArweaveSigner(adminWallet),
    initState: JSON.stringify(initialState),
    src: contractSrc,
  })
  console.log("contractTxId", contractTxId)
}

// deployFromSourceTx()
deploy()
