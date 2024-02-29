import { useEffect, useState } from "react"
import SDK from "weavedb-sdk"

export default function Home() {
  //Replace contractTxId string value with the contractTxId when deploying the WeaveDB contract.
  const contractTxId = "kdYSrsiN-UwPN9ID7oHF8SHuCKnUc8nHfvgyCozl5O4"
  // Replace COLLECTION_NAME string value with the name of your collection. For this example, we have set people as our collection name.
  const COLLECTION_NAME = "people"

  // State variable storing an array of people data
  const [people, setPeople] = useState([])
  // State variable storing the weavedb-sdk object
  const [db, setDb] = useState(null)
  // State variable storing a boolean value indicating whether database initialization is complete.
  const [initDb, setInitDb] = useState(false)

  const setupWeaveDB = async () => {
    try {
      const _db = new SDK({
        contractTxId: contractTxId,
      })
      await _db.init()
      setDb(_db)
      setInitDb(true)
    } catch (e) {
      console.error("setupWeaveDB", e)
    }
  }

  // Function to retrieve all docs from the database collection.
  const getCollection = async () => {
    try {
      const result = await db.cget(COLLECTION_NAME)
      setPeople(result)
      console.log("getCollection()", result)
    } catch (e) {
      console.error(e)
    }
  }

  const handleAddClick = async () => {
    const personData = { name: "Bob", age: Number(20) }

    try {
      const result = await db.add(personData, COLLECTION_NAME)
      getCollection()
      console.log("handleAddClick()", result)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    setupWeaveDB()
  }, [])

  // Effect hook to retrieve all docs from the collection on database initialization.
  useEffect(() => {
    if (initDb) {
      getCollection()
    }
  }, [initDb])

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <br />
        <br />
        <button onClick={handleAddClick}>Add Person</button>
        <br /> <br />
        <table cellPadding="8px">
          <thead>
            <tr align="left">
              <th>Name</th>
              <th>Age</th>
              <th>DocId</th>
            </tr>
          </thead>
          <tbody>
            {people.map((item, index) => (
              <tr key={index}>
                <td>{item.data.name}</td>
                <td>{item.data.age}</td>
                <td>{item.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
