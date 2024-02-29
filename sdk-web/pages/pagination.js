import WeaveDB from "weavedb-sdk"

export default function Home() {
  const CONTRACT_TX_ID = "AYiseMQyS2uX5LGXFI4FmJJdC1bqwpjJy1fYpVvaWZ8"
  const COLLECTION_NAME = "people"
  const LIMIT_PER_PAGE = 5

  const start = async () => {
    try {
      const db = new WeaveDB({
        contractTxId: CONTRACT_TX_ID,
      })
      await db.init()

      const docs_page1 = await db.cget(
        COLLECTION_NAME,
        ["name", "asc"],
        LIMIT_PER_PAGE
      )
      console.log("docs_page1", docs_page1)

      const docs_page2 = await db.cget(
        COLLECTION_NAME,
        ["name", "asc"],
        ["startAfter", docs_page1[docs_page1.length - 1]],
        LIMIT_PER_PAGE
      )
      console.log("docs_page2", docs_page2)

      const docs_page3 = await db.cget(
        COLLECTION_NAME,
        ["name", "asc"],
        ["startAfter", docs_page2[docs_page2.length - 1]],
        LIMIT_PER_PAGE
      )
      console.log("docs_page3", docs_page3)
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
