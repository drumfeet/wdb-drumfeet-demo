import WeaveDB from "weavedb-sdk"
export default function Home() {
  function createLargeObject(targetSize) {
    let obj = {}
    let size = 0

    while (size < targetSize) {
      const randomKey = Math.random().toString(36).substring(2, 15)
      const randomValue = Math.random().toString(36).substring(2, 15)
      obj[randomKey] = randomValue

      const jsonString = JSON.stringify(obj)
      size = new Blob([jsonString], { type: "application/json" }).size
    }

    return obj
  }

  const start = async () => {
    try {
      const largeObject = createLargeObject(3200)
      console.log("Generated object:", largeObject)
      console.log(
        "Approximate size:",
        new Blob([JSON.stringify(largeObject)], { type: "application/json" })
          .size,
        "bytes"
      )

      const db = new WeaveDB({
        contractTxId: "wlopNqrWLbkA9jNtjhcmZ3TNM3SlurnTd2_peU7yASI",
      })
      await db.init()
      const tx = await db.add(largeObject, "people")
      console.log("tx", tx)
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
