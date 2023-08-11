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
      const tx = await db.add(
        {
          title: "Test Title",
          content: "Test Content",
        },
        "sample"
      )
      console.log("tx", tx)
    } catch (e) {
      console.error(e)
    }
  }

  const update = async () => {
    try {
      const tx = await db.update(
        {
          title: "Test Title 1",
          content: "Test Content 1",
        },
        "sample",
        "RtLCFdwG7qLRTf53Guy"
      )
      console.log("tx", tx)
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
      <br />
      <br />
      <button onClick={update}>Update</button>
    </>
  )
}
