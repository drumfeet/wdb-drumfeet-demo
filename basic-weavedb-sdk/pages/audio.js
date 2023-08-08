import { useEffect, useState } from "react"
import SDK from "weavedb-sdk"

export default function Home() {
  const contractTxId = "35TPtBaJtVfOpcWaii8ZRSf4HbSB2lxkkoMBhrgTDzI"
  const [db, setDb] = useState(null)
  const [initDb, setInitDb] = useState(false)

  const setupWeaveDB = async () => {
    try {
      const _db = new SDK({
        contractTxId,
        remoteStateSyncEnabled: true,
        remoteStateSyncSource: "https://dre-3.warp.cc/contract",
      })
      await _db.init()
      setDb(_db)
      setInitDb(true)
    } catch (e) {
      console.error("setupWeaveDB", e)
    }
  }

  const getDocs = async () => {
    try {
      console.log(">>getDocs()")
      const tx = await db.cget("coas_nftcanvases")
      console.log(tx)
    } catch (e) {
      console.error(e)
    } finally {
      console.log("<<getDocs()")
    }
  }

  useEffect(() => {
    setupWeaveDB()
  }, [])

  return (
    <>
      <button onClick={getDocs}>Get Docs</button>
    </>
  )
}
