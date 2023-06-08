import SDK_NODE from "weavedb-sdk-node"
import { Contract, ethers } from "ethers"
const provider = new ethers.JsonRpcProvider(process.env.MUMBAI_RPC_URL)
const contractTxId = process.env.NEXT_PUBLIC_WEAVEDB_CONTRACT_TX_ID
const nftContractAddr = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS
import abi from "@/lib/NFT.json"

export default async (req, res) => {
  try {
    const params = JSON.parse(req.body)
    const signerAddress = params.query[0].user_address

    const address = ethers.getAddress(signerAddress)
    const nftBalance = await new Contract(
      nftContractAddr,
      abi,
      provider
    ).balanceOf(address)

    const sdk = new SDK_NODE({
      contractTxId: contractTxId,
    })
    await sdk.initializeWithoutWallet()

    const _nftBalance = Number(nftBalance)
    const tx = await sdk.relay(params.jobID, params, _nftBalance, {
      jobID: params.jobID,
      privateKey: process.env.RELAYER_PRIVATEKEY,
    })

    if (tx.error) {
      res
        .status(200)
        .json({ success: false, error: tx.error, nftBalance: _nftBalance })
    }
    res.status(200).json({ success: true, tx: tx, nftBalance: _nftBalance })
  } catch (e) {
    res.status(200).json({ success: false, error: e })
  }
}
