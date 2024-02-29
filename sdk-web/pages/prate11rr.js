import { useEffect, useState } from "react"
import SDK from "weavedb-sdk"

const useInitWeaveDB = () => {
  const [db, setDb] = useState(null)
  const [initDb, setInitDb] = useState(false)
  const [user, setUser] = useState(null)

  // Effect hook to initialize the database object on component mount.
  useEffect(() => {
    ;(async () => {
      try {
        const _db = new SDK({
          contractTxId: "W00EhrAHqD2CxLd81N8yyCOOK0xtPTtfKIQEZGzKabU",
        })
        await _db.init()
        setDb(_db)
        setInitDb(true)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  useEffect(() => {
    const loginFunc = async () => {
      const wallet_address = "0xCFe3e0E5B16d81E03EA2c4321B95f256aCe3aB8c"
      const { tx, identity, err } = await db.createTempAddress(wallet_address)
      const linked = await db.getAddressLink(identity?.address)
      if (!linked) return

      if (tx && !tx.err && !err) {
        identity.tx = tx
        identity.linked_address = wallet_address
        setUser({
          wallet: wallet_address,
          privateKey: identity.privateKey,
        })
      }
    }

    if (initDb && db && !user) {
      loginFunc()
    }
  }, [initDb])
}

export default useInitWeaveDB
