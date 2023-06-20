const { useEffect, useState } = require("react")
import SDK from "weavedb-sdk"
import { WarpFactory } from "warp-contracts"

const InternalWrite = () => {
  const [db, setDb] = useState(null)

  const contractTxId = "e3RyM9TN4_8nJC_lPofpA3aWi6Zh_7rthom-aiWwBJw"
  const relayerContractTxId = "NRA2h_O2UjFhJ5nd4tnGrYRbo8GDvAsSlsFoSgaJjxI"

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

  const relayClick = async () => {
    try {
      const any_arweave_wallet = "tZcRHsAJPpwCzDoQrxgDxJ27o5ER228AWsY2uxF0X3w"
      const warp = WarpFactory.forMainnet()
      const contract = warp
        .contract(relayerContractTxId)
        .connect(any_arweave_wallet)
        .setEvaluationOptions({ internalWrites: true, allowBigInt: true })

      const data = { name: "Bob", age: 20 }
      const params = await db.sign("set", data, "ppl", "Bob3", {
        jobID: "add-height",
      })

      // const result = await contract.bundleInteraction({
      //   function: "relay",
      //   to: contractTxId,
      //   params,
      // })

      const result = await contract.writeInteraction({
        function: "relay",
        to: contractTxId,
        params,
      })

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
      <button onClick={relayClick}>Relay</button>
    </>
  )
}
export default InternalWrite
