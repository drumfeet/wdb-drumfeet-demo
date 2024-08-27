import WeaveDB from "weavedb-sdk"

export default function Home() {
  const CONTRACT_TX_ID = "a02910pmJcCR0QwucZCGfY23NaQkagmETkpHq70oQWc"
  const MAIN_COLLECTION_NAME = "sample1"
  const EXISTING_DOC_ID = "Bob"
  const SUB_COLLECTION_NAME = "mysub"

  const start = async () => {
    try {
      const db = new WeaveDB({
        contractTxId: CONTRACT_TX_ID,
      })
      await db.init()

      const subcollection_rules = { "allow write": true }
      const result = await db.setRules(
        subcollection_rules,
        MAIN_COLLECTION_NAME,
        EXISTING_DOC_ID,
        SUB_COLLECTION_NAME
      )
      console.log("result", result)
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
