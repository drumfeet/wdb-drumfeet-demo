import SDK from "weavedb-sdk"
export default function Home() {
  const start = async () => {
    try {
      const db = new SDK({
        contractTxId: "tbg8t02nuUl_KahdVcOd6lxDeFDgtEQnVIyyqR8i8Nw",
      })
      await db.init()
      const txSetRules = await db.setRules({ "allow write": true }, "sample1")
      console.log("txSetRules", txSetRules)
      // alert("done")
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <button onClick={start}>Start</button>
    </>
  )
}
