import { useEffect, useState } from "react"
import SDK from "weavedb-sdk"

export default function Home() {
  const contractTxId = "W00EhrAHqD2CxLd81N8yyCOOK0xtPTtfKIQEZGzKabU"
  const [db, setDb] = useState(null)
  const [initDb, setInitDb] = useState(false)

  const setupWeaveDB = async () => {
    try {
      const _db = new SDK({
        contractTxId,
      })
      await _db.init()
      setDb(_db)
      setInitDb(true)
    } catch (e) {
      console.error("setupWeaveDB", e)
    }
  }

  const add = async () => {
    try {
      const { identity } = await db.createTempAddressWithAR()
      console.log("identity", identity)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    setupWeaveDB()
  }, [])

  return (
    <>
      <button onClick={add}>Add</button>
    </>
  )
}
