import WeaveDB from "weavedb-sdk"
export default function Home() {
  const start = async () => {
    try {
      const db = new WeaveDB({
        contractTxId: "sslEWJ-E8O6Xxr82U3qZika_7h_LvjID6A8QUluC2qM",
      })
      db.init()
      console.log("db", db)
      const result = await db.cget("people")
      console.log("result", result)

      //   const tx = await db.get(
      //     "people",
      //     ["name", "==", "Bob"],
      //     ["age", "==", 20]
      //   )
      //   console.log("tx", tx)
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <div>
      <h1>Home</h1>
      <button onClick={start}>Start</button>
    </div>
  )
}
