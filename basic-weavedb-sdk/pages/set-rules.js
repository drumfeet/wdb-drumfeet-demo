import WeaveDB from "weavedb-sdk"
export default function Home() {
  const start = async () => {
    try {
      const db = new WeaveDB({
        contractTxId: "wlopNqrWLbkA9jNtjhcmZ3TNM3SlurnTd2_peU7yASI",
      })
      await db.init()
      await db.setRules({ "allow write": true }, "sample2")
      console.log("done")
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      Home
      <br />
      <br />
      <button onClick={start}>Start</button>
    </>
  )
}
