import { useEffect, useState } from "react"
import SDK from "weavedb-sdk"

export default function Home() {
  const [db, setDb] = useState()
  const [identity, setIdentity] = useState()

  const setupWeaveDB = async () => {
    const _db = new SDK({
      contractTxId: "AbLGZtbaDZAoe6qqXNqZB8YKetqpA9wW7oPexjHSCdA",
    })
    await _db.init()
    setDb(_db)
  }

  const login = async () => {
    const { identity } = await db.createTempAddress()
    console.log("identity", identity)
    setIdentity(identity)
  }

  const addPeople = async () => {
    const tx = await db.add({ name: "Bob", age: 20 }, "people", identity)
    console.log("tx", tx)
  }

  useEffect(() => {
    setupWeaveDB()
  }, [])

  return (
    <>
      <button onClick={login}>Login</button>
      <br />
      <br />
      <button onClick={addPeople}>Add People</button>
    </>
  )
}
