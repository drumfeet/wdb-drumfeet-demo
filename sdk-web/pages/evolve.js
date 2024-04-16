import WeaveDB from "weavedb-sdk"

export default function Home() {
  //   const CONTRACT_TX_ID = "0a6zzEve6-44WVTbHzGny8CztpxzYJUI9klIrwJ26vA"
  const CONTRACT_TX_ID = "S_faMTSwQOFTz27x1KUsiINwqz4jf45mta-f1DvojMA"

  const evolve = async () => {
    const db = new WeaveDB({ contractTxId: CONTRACT_TX_ID })
    await db.init()

    const res = await db.getEvolve()
    console.log("res", res)

    const tx2 = await db.evolve(CONTRACT_TX_ID)
    console.log("tx2", tx2)

    // const tx3 = await db.migrate("0.37.2")
    // console.log("tx3", tx3)
  }

  return (
    <>
      <br />
      <br />
      <button onClick={evolve}>Evolve</button>
      <br />
      <br />
    </>
  )
}
