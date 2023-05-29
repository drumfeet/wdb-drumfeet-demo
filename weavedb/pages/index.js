import SDK from "weavedb-sdk"
import { useEffect, useState } from "react"

export default function Home() {
  const [db, setDb] = useState(null)
  const contractTxId = "SNencor4RYUP9CEqCXRTWPMSv8WPd4R9YjqhgtmSLtc"

  const handleJoinClick = async () => {
    try {
      const result = await db.add({ name: "drumfeet event" }, "test")
      console.log("result", result)
    } catch (e) {
      console.error("handleJoinClick", e)
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const _db = new SDK({
          contractTxId,
        })
        setDb(_db)
        await _db.initializeWithoutWallet()
      } catch (e) {
        console.error("useEffect", e)
      }
    })()
  }, [])

  return (
    <>
      {db && (
        <>
          Ready <br />
        </>
      )}
      <button onClick={handleJoinClick}>Join</button>
    </>
  )
}
