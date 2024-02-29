import { useEffect, useState } from "react"
import SDK from "weavedb-sdk"

export default function Home() {
  const contractTxId = "qjVv7dIgyvhWfWlNSZXcsIVmW49ZJmBG2cW9cPKqt3c" //evm
  // const contractTxId = "o4PlKxB8gEwRx36vjZq2qCsbwlqNkmuXbFX8WknfK6Q" //arweave
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

  const setRulesAR = async () => {
    try {
      const wallet = window.arweaveWallet
      await wallet.connect(["SIGNATURE", "ACCESS_PUBLIC_KEY", "ACCESS_ADDRESS"])
      const tx = await db.setRules({ "allow write": true }, "sample", {
        ar: wallet,
      })
      console.log("tx", tx)
    } catch (e) {
      console.error(e)
    }
  }

  const setAlgorithmAR = async () => {
    try {
      const wallet = window.arweaveWallet
      await wallet.connect(["SIGNATURE", "ACCESS_PUBLIC_KEY", "ACCESS_ADDRESS"])
      const tx = await db.setAlgorithms(["rsa256"], { ar: wallet })
      console.log("tx", tx)
    } catch (e) {
      console.error(e)
    }
  }

  const addAR = async () => {
    try {
      const wallet = window.arweaveWallet
      await wallet.connect(["SIGNATURE", "ACCESS_PUBLIC_KEY", "ACCESS_ADDRESS"])
      const tx = await db.add({ name: "test" }, "sample", { ar: wallet })
      console.log("tx", tx)
    } catch (e) {
      console.error(e)
    }
  }

  const setRules = async () => {
    try {
      const tx = await db.setRules({ "allow write": true }, "sample")
      console.log("tx", tx)
    } catch (e) {
      console.error(e)
    }
  }

  const setAlgorithm = async () => {
    try {
      const tx = await db.setAlgorithms([
        "secp256k1",
        "rsa256",
        "secp256k1-2",
        "ed25519",
      ])
      console.log("tx", tx)
    } catch (e) {
      console.error(e)
    }
  }

  const add = async () => {
    try {
      const tx = await db.add({ name: "test" }, "sample")
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
      <br />
      <br />
      <button onClick={setRulesAR}>Set Rules AR</button>
      <br />
      <br />
      <button onClick={setAlgorithmAR}>Set Algorithm AR</button>
      <br />
      <br />
      <button onClick={addAR}>Add AR</button>
      <br />
      <br />
      <button onClick={setRules}>Set Rules</button>
      <br />
      <br />
      <button onClick={setAlgorithm}>Set Algorithm</button>
      <br />
      <br />
      <button onClick={add}>Add</button>
    </>
  )
}
