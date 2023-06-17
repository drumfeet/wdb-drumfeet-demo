import { useEffect, useState } from "react"
import SDK from "weavedb-sdk"

const Example = () => {
  const contractTxId = "e3RyM9TN4_8nJC_lPofpA3aWi6Zh_7rthom-aiWwBJw"
  const sonarLink = `https://sonar.warp.cc/?#/app/contract/${contractTxId}`
  const [db, setDb] = useState(null)

  const handleSetClick = async () => {
    try {
      // const tx = await db.set({test:[{profileId1: "user1"}, {profileId2: "user2"}]}, "sample", "four")
      const tx = await db.upsert(
        { profileAddedBy: { "0x04": "0x0182f9", "0x05": "0x0182f9" } },
        "sample",
        "five"
      )
      console.log("tx", tx)
    } catch (e) {
      console.error("error", e)
    }
  }

  const handleUpdateClick = async () => {
    try {
      //   const tx = await db.update({test: db.union({profileId3: "user3"})}, "sample", "four")
      const tx = await db.update(
        { profileAddedBy: db.union({ "0x06": "0x0182f9" }) },
        "sample",
        "five"
      )
      console.log("tx", tx)
    } catch (e) {
      console.error("error", e)
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
      <br /> <br />
      <button onClick={handleSetClick}>Set</button>
      <br /> <br />
      <button onClick={handleUpdateClick}>Update</button>
      <br /> <br />
      <a href={sonarLink} target="_blank" rel="noopener noreferrer">
        Contract Transactions
      </a>
    </>
  )
}
export default Example
