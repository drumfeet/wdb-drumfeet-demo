import { useEffect, useState } from "react"
import SDK from "weavedb-sdk"

export default function Home() {
  const contractTxId = "86LpJmMQTyBC4KjQTwkMoclCDOsLTlzQsNQIGifYFY4"
  const COLLECTION_NAME = "test"
  const [db, setDb] = useState(null)
  const [initDb, setInitDb] = useState(false)
  const [collectionAddress, setCollectionAddress] = useState("")
  const [image, setImage] = useState("")
  const [tokenId, setTokenId] = useState(0)
  const [printSize, setPrintSize] = useState("")
  const [printMaterial, setPrintMaterial] = useState("")
  const [ownerWallet, setOwnerWallet] = useState("")
  const [printerWallet, setPrinterWallet] = useState("")
  const [timestamp, setTimestamp] = useState(0)
  const [source, setSource] = useState("")
  const [hash, setHash] = useState("")

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

  const set = async () => {
    try {
      const tx = await db.set(
        {
          collectionAddress: collectionAddress,
          image: image,
          tokenId: tokenId,
          printSize: printSize,
          printMaterial: printMaterial,
          ownerWallet: ownerWallet,
          printerWallet: printerWallet,
          timestamp: timestamp,
          source: source,
          hash: hash,
        },
        COLLECTION_NAME,
        hash
      )
      console.log("tx", tx)
      alert(tx.success ? "Transaction successful" : "Transaction failed")
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    setupWeaveDB()
  }, [])

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
        <button onClick={set}>Set</button>
        <br />
        <br />
        <label>collectionAddress</label>
        <input
          placeholder="collectionAddress"
          value={collectionAddress}
          onChange={(e) => setCollectionAddress(e.target.value)}
        />
        <br />
        <label>image</label>
        <input
          placeholder="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br />
        <label>tokenId</label>
        <input
          value={tokenId}
          onChange={(e) => setTokenId(Number(e.target.value))}
        />
        <br />
        <label>printSize</label>
        <input
          placeholder="printSize"
          value={printSize}
          onChange={(e) => setPrintSize(e.target.value)}
        />
        <br />
        <label>printMaterial</label>
        <input
          placeholder="printMaterial"
          value={printMaterial}
          onChange={(e) => setPrintMaterial(e.target.value)}
        />
        <br />
        <label>ownerWallet</label>
        <input
          placeholder="ownerWallet"
          value={ownerWallet}
          onChange={(e) => setOwnerWallet(e.target.value)}
        />
        <br />
        <label>printerWallet</label>
        <input
          placeholder="printerWallet"
          value={printerWallet}
          onChange={(e) => setPrinterWallet(e.target.value)}
        />
        <br />
        <label>timestamp</label>
        <input
          value={timestamp}
          onChange={(e) => setTimestamp(Number(e.target.value))}
        />
        <br />
        <label>source</label>
        <input
          placeholder="source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <br />
        <label>hash</label>
        <input
          placeholder="hash"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
        />
        <br />

        <br />
      </div>
    </>
  )
}
