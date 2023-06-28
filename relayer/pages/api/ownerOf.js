import SDK_NODE from "weavedb-sdk-node"
import { Contract, ethers } from "ethers"
const provider = new ethers.JsonRpcProvider(process.env.MUMBAI_RPC_URL)
const contractTxId = process.env.NEXT_PUBLIC_WEAVEDB_CONTRACT_TX_ID
const nftContractAddr = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS
import abi from "@/lib/NFT.json"

export default async (req, res) => {
  const params = JSON.parse(req.body)
  const tokenID = params.query[0].tokenID
  let owner = "0x"

  try {
    owner = await new Contract(nftContractAddr, abi, provider).ownerOf(tokenID)

    const sdk = new SDK_NODE({
      contractTxId: contractTxId,
    })
    await sdk.initializeWithoutWallet()

    const tx = await sdk.relay(params.jobID, params, owner, {
      jobID: params.jobID,
      privateKey: process.env.RELAYER_PRIVATEKEY,
    })

    res.status(200).json({ success: true, tx: tx })
  } catch (e) {
    res.status(200).json({ success: false, error: e })
  }
}
