import { useEffect, useState } from "react"
import SDK from "weavedb-sdk"

const Pagination = () => {
  const contractTxId = "RBaVwzbhvzxXP2Z6AfjSAgiFs6DydmP0_4qUkTl3EL8"
  const [db, setDb] = useState(null)
  const [initDb, setInitDb] = useState(false)
  const [comments, setComments] = useState([])

  const setupWeaveDb = async () => {
    const _db = new SDK({
      contractTxId,
    })
    await _db.initializeWithoutWallet()
    setDb(_db)
    setInitDb(true)
  }

  const handleSeeMoreClick = async () => {
    try {
    } catch (e) {
      console.error("handleSeeMoreClick", e)
    }
  }

  useEffect(() => {
    ;(async () => {
      if (initDb) {
        const _comments = await db.cget("pagination")
        console.log("_comments", _comments)
        setComments(_comments)
      }
    })()
  }, [initDb])

  useEffect(() => {
    setupWeaveDb()
  }, [])

  return (
    <>
      Hello
      <br />
      <button onClick={handleSeeMoreClick}>See More</button>
    </>
  )
}
export default Pagination
