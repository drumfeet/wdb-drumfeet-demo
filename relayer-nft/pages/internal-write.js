const { useEffect, useState } = require("react")
import SDK from "weavedb-sdk"

const InternalWrite = () => {
  const [db, setDb] = useState(null)

  const contractTxId = "e3RyM9TN4_8nJC_lPofpA3aWi6Zh_7rthom-aiWwBJw"
  const relayerContractTxId = "NRA2h_O2UjFhJ5nd4tnGrYRbo8GDvAsSlsFoSgaJjxI"
  const jobID = "add-height"
  const job = {
    relayers: [relayerContractTxId],
    internalWrites: true,
  }

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
  const addRelayerJobAr = async () => {
    try {
      //   const result = await db.addRelayerJob(jobID, job, { ar: adminWallet })
      //   console.log("result", result)
    } catch (e) {
      console.error("addRelayerJobAr", e)
    }
  }

  const relayClick = async () => {}

  useEffect(() => {
    setupWeaveDb()
  }, [])

  return (
    <>
      <button title="Arweave Wallet Only" onClick={addRelayerJobAr}>
        Add Relayer Job (AR)
      </button>
      <br />
      <br />
      <button onClick={relayClick}>Relay</button>
    </>
  )
}
export default InternalWrite
