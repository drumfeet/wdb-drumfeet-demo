import { useEffect, useState } from "react"
import SDK from "weavedb-sdk"
import { ethers } from "ethers"

export default function Home() {
  const contractTxId = "W00EhrAHqD2CxLd81N8yyCOOK0xtPTtfKIQEZGzKabU"
  const COLLECTION_NAME = "tasks"
  const [db, setDb] = useState(null)
  const [initDb, setInitDb] = useState(false)
  const [user, setUser] = useState()

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

  const login = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum, "any")
    const signer = await provider.getSigner()
    await provider.send("eth_requestAccounts", [])
    const wallet_address = await signer.getAddress()

    const { identity } = await db.createTempAddress(wallet_address)
    console.log("identity", identity)
    const linked = await db.getAddressLink(identity.address)
    console.log("linked", linked)
    setUser(identity)
  }

  const add = async () => {
    const tx = await db.add({ name: "Bob", age: 20 }, COLLECTION_NAME, user)
  }

  useEffect(() => {
    setupWeaveDB()
  }, [])

  useEffect(() => {
    if (initDb) {
    }
  }, [initDb])

  return (
    <>
      <button onClick={login}>Login</button>
      <br />
      <br />
      <button onClick={add}>Add</button>
    </>
  )
}
