const { useEffect, useState } = require("react")
import SDK from "weavedb-sdk"

const InternalWrite = () => {
  const [db, setDb] = useState(null)
  const contractTxId = "e3RyM9TN4_8nJC_lPofpA3aWi6Zh_7rthom-aiWwBJw"

  const setupWeaveDb = async () => {
    try {
      const _db = new SDK({
        contractTxId,
      })
      await _db.initializeWithoutWallet()
      setDb(_db)
    } catch (e) {
      console.error("setupWeaveDb", e)
    }
  }

  const createTempAddressClick = async () => {
    try {
      const result = await db.createTempAddress()
      console.log("result", result)
    } catch (e) {
      console.error("relayClick", e)
    }
  }

  useEffect(() => {
    setupWeaveDb()
  }, [])

  return (
    <>
      <br />
      <br />
      <button onClick={createTempAddressClick}>createTempAddress</button>
    </>
  )
}
export default InternalWrite
