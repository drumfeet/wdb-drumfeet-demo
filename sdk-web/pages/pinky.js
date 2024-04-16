import { useEffect, useState } from "react"
import SDK from "weavedb-sdk"

export default function Home() {
  const [db, setDb] = useState()
  const [identity, setIdentity] = useState()

  const setupWeaveDB = async () => {
    const _db = new SDK({
      contractTxId: "Sl1ParTvpAcwEk2nEfjudCk7QnJE1M7_3B_eMMnDwYI",
    })
    await _db.init()
    setDb(_db)
  }

  const set = async () => {
    const tx = await db.set(
      {
        id: Number("1"),
        // url: `https://arweave.net/${receipt.id}`,
      },
      "nft_Metadata",
      "one"
    )
  }

  useEffect(() => {
    setupWeaveDB()
  }, [])

  return (
    <>
      <button onClick={set}>Set</button>
    </>
  )
}
