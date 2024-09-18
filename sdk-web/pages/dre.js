import WeaveDB from "weavedb-sdk"

export default function Home() {
  // const CONTRACT_TX_ID = "8g-SkUU-JQ6eL077f3eflUkTgNJC1ag-7AAwwynGKSc"
  // const CONTRACT_TX_ID ="Y_NAQmxw7C48BaMBu4pPpUlTy6LcgeCGN4ayuRd_Doo"
  // const CONTRACT_TX_ID = "a02910pmJcCR0QwucZCGfY23NaQkagmETkpHq70oQWc"
  // const CONTRACT_TX_ID = "q1uWalwlErMD9z4dUQdm6yb1Er97PIkdkbk-ZUZ6Fww"
  const CONTRACT_TX_ID = "vYs30AaYQv2VUSL6S5jt1dpJl9CO4hnk5ddbQy4YJA8"
  // const COLLECTION_NAME = "drumtest"
  const COLLECTION_NAME = "sample1"

  const start = async () => {
    try {
      const db = new WeaveDB({
        contractTxId: CONTRACT_TX_ID,
        remoteStateSyncEnabled: true,
        remoteStateSyncSource: "https://dre-testnet.weavedb-node.xyz/contract",
        // remoteStateSyncSource: "https://dre-1.warp.cc/contract",
      })
      await db.init()

      const result1 = await db.get(COLLECTION_NAME)
      console.log("result1", result1)

      // const result2 = await db.add({ name: "drumfeet3" }, COLLECTION_NAME)
      // console.log("result2", result2)

      // const result3 = await db.setRules({ "allow write": true }, "drumtest")
      // console.log("result3", result3)
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
