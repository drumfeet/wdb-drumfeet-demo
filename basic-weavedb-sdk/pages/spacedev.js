import { useEffect, useState } from "react"
import SDK from "weavedb-sdk"

export default function Home() {
  const contractTxId = "3bel3NmKVjEoPaCmHeUHx4GFBjSZ86xWprXZ7OGa79U"
  const [db, setDb] = useState(null)
  const [initDb, setInitDb] = useState(false)

  const getAllCommunities = async () => {
    console.log("response")
    try {
      const communitiesResponse = await db.cget("communities")
      console.log("communitiesResponse", communitiesResponse)
      const communities = communitiesResponse.map((community) => community.data)
      console.log("weaveApi - getAllCommunities() - communities:", communities)
    } catch (error) {
      console.log(error)
    }
  }

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

  useEffect(() => {
    setupWeaveDB()
  }, [])

  return (
    <>
      <button onClick={getAllCommunities}>getAllCommunities</button>
    </>
  )
}
