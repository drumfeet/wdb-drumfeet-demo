import { useEffect, useState } from "react"
import SDK from "weavedb-sdk"
import { ethers } from "ethers"

const RelayerNft = () => {
  const contractTxId = process.env.NEXT_PUBLIC_WEAVEDB_CONTRACT_TX_ID
  const sonarLink = `https://sonar.warp.cc/?#/app/contract/${contractTxId}`
  const [db, setDb] = useState(null)
  const [tokenId, setTokenId] = useState()

  const handleOwnerOfClick = async () => {
    console.log("handleBtnClick")

    try {
      const provider = new ethers.BrowserProvider(window.ethereum, "any")
      await provider.send("eth_requestAccounts", [])
      const _signer = await provider.getSigner()
      const _signerAddress = await _signer.getAddress()

      const params = await db.sign(
        "upsert",
        { tokenID: Number(tokenId), text: "sampletext2" },
        "nft",
        tokenId,
        {
          wallet: _signerAddress,
          jobID: "nft",
        }
      )
      console.log("params", params)

      const response = await fetch("/api/ownerOf", {
        method: "POST",
        body: JSON.stringify(params),
      })
      const responseJson = await response.json()
      console.log("responseJson", responseJson)

      if (responseJson.error) {
        throw new Error(responseJson.error)
      }
    } catch (e) {
      console.error("handleBtnClick", e)
    }
  }

  const handleBalanceOfClick = async () => {
    console.log("handleBtnClick")

    try {
      const provider = new ethers.BrowserProvider(window.ethereum, "any")
      await provider.send("eth_requestAccounts", [])
      const _signer = await provider.getSigner()
      const _signerAddress = await _signer.getAddress()

      const params = await db.sign(
        "upsert",
        { tokenID: _signerAddress, text: "sampletext4" },
        "nft",
        tokenId,
        {
          wallet: _signerAddress,
          jobID: "nft",
        }
      )
      console.log("params", params)

      const response = await fetch("/api/balanceOf", {
        method: "POST",
        body: JSON.stringify(params),
      })
      const responseJson = await response.json()
      console.log("responseJson", responseJson)

      if (responseJson.error) {
        throw new Error(responseJson.error)
      }
    } catch (e) {
      console.error("handleBtnClick", e)
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const _db = new SDK({
          contractTxId,
        })
        await _db.initializeWithoutWallet()
        setDb(_db)
      } catch (e) {
        console.error("useEffect", e)
      }
    })()
  }, [])

  return (
    <>
      <input
        placeholder="tokenID"
        type="number"
        onChange={(e) => setTokenId(e.target.value)}
      />
      <button onClick={handleOwnerOfClick}>ownerOf</button>
      <button onClick={handleBalanceOfClick}>balanceOf</button>
      <br />
      <br />
      <a href={sonarLink} target="_blank" rel="noopener noreferrer">
        Contract Transactions
      </a>
    </>
  )
}
export default RelayerNft
