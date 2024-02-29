import { useEffect, useState } from "react"
import SDK from "weavedb-sdk"

export default function Home() {
  const contractTxId = "qjVv7dIgyvhWfWlNSZXcsIVmW49ZJmBG2cW9cPKqt3c"
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

  const set = async () => {
    try {
      const tx = await db.set(
        {
          title: "Test Title",
          content: "Test Content",
        },
        "sample",
        "hellotest"
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
        "hellotest"
      )
      console.log("tx", tx)
    } catch (e) {
      console.error(e)
    }
  }

  const getFromNode = async () => {
    try {
      console.log("getFromNode")
      const response = await fetch("/api/sample")
      const jsonData = await response.json()
      console.log("jsonData", jsonData)
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
      <button onClick={set}>Set</button>
      <br />
      <br />
      <button onClick={update}>Update</button>
      <br />
      <br />
      <button onClick={getFromNode}>Get From Node</button>
    </>
  )
}
