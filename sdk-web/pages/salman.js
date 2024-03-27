import { identity } from "ramda"
import { useState } from "react"
import WeaveDB from "weavedb-sdk"

export default function Home() {
  const CONTRACT_TX_ID = "vErkhueWmK6mrvrcUd0pFUuX7mYqEBLFrS44tFpoIjI"
  const COLLECTION_NAME = "wave-acl"
  const [db, setDb] = useState()
  const [user, setUser] = useState()

  const schema = {
    type: "object",
    required: ["name", "username"],
    properties: {
      name: {
        type: "string",
      },
      bio: {
        type: "string",
      },
      username: {
        type: "string",
      },
      avatar: {
        type: "string",
      },
      links: {
        type: "object",
        required: [],
        properties: {
          facebook: {
            type: "string",
          },
          youtube: {
            type: "string",
          },
          github: {
            type: "string",
          },
          snapchat: {
            type: "string",
          },
          telegram: {
            type: "string",
          },
          discord: {
            type: "string",
          },
          farcaster: {
            type: "string",
          },
          blockchain: {
            type: "string",
          },
          linkedin: {
            type: "string",
          },
          x: {
            type: "string",
          },
          instagram: {
            type: "string",
          },
          other: {
            type: "string",
          },
        },
      },
      owner: {
        type: "string",
      },
    },
  }
  const rules = {
    "let create": {
      "resource.newData.createdAt": {
        var: "request.block.timestamp",
      },
      "resource.newData.owner": {
        var: "request.auth.signer",
      },
    },
    "let update": {
      "resource.newData.updatedAt": {
        var: "request.block.timestamp",
      },
      "resource.newData.owner": {
        var: "request.auth.signer",
      },
    },
    "allow create": {
      and: [
        {
          "==": [
            { var: "request.auth.signer" },
            { var: "resource.newData.owner" },
          ],
        },
        {
          "==": [
            { var: "request.block.timestamp" },
            { var: "resource.newData.createdAt" },
          ],
        },
      ],
    },
    "allow update": {
      and: [
        {
          "==": [{ var: "request.auth.signer" }, { var: "resource.setter" }],
        },
        {
          "==": [
            { var: "resource.data.username" },
            { var: "resource.newData.username" },
          ],
        },
        {
          "==": [
            { var: "request.block.timestamp" },
            { var: "resource.newData.updatedAt" },
          ],
        },
      ],
    },
    "allow delete": {
      "==": [{ var: "request.auth.signer" }, { var: "resource.setter" }],
    },
  }

  const setMySchema = async () => {
    const db = new WeaveDB({ contractTxId: CONTRACT_TX_ID })
    await db.init()
    const tx = await db.setSchema(schema, COLLECTION_NAME)
    console.log("tx", tx)
  }

  const setMyRules = async () => {
    const db = new WeaveDB({ contractTxId: CONTRACT_TX_ID })
    await db.init()
    const tx = await db.setRules(rules, COLLECTION_NAME)
    console.log("tx", tx)
  }

  const add = async () => {
    const db = new WeaveDB({ contractTxId: CONTRACT_TX_ID })
    await db.init()

    const dataObj = {
      name: "John Doe",
      bio: "Tech enthusiast and developer",
      username: "johndoe",
      avatar: "https://example.com/profile_picture.jpg",
      links: {
        facebook: "https://www.facebook.com/johndoe",
        youtube: "https://www.youtube.com/channel/johndoe",
        github: "https://github.com/johndoe",
        web3: "https://web3.example.com/johndoe",
        linkedin: "https://www.linkedin.com/in/johndoe",
        twitter: "https://twitter.com/johndoe",
        instagram: "https://www.instagram.com/johndoe",
      },
    }

    const res = await db.add(dataObj, COLLECTION_NAME)
    console.log("res", res)
  }

  const initDb = async () => {
    const _db = new WeaveDB({ contractTxId: CONTRACT_TX_ID, nocache: true })
    await _db.init()
    setDb(_db)
    console.log(_db)
  }

  const login = async () => {
    const expiry = 60 * 60 * 24 * 7
    const { identity } = await db.createTempAddress()
    setUser(identity)
    console.log(identity)
  }

  const autoSign = async () => {
    const _db = new WeaveDB({ contractTxId: CONTRACT_TX_ID, nocache: true })
    await _db.init()
    // const { identity } = await _db.createTempAddress()
    // console.log("identity", identity)
    // console.log(
    //   "getAddressLink",
    //   await _db.getAddressLink(identity.address.toLowerCase())
    // )

    // const tx = await _db.add({ name: "test" }, COLLECTION_NAME, identity)
  }

  return (
    <>
      <button onClick={setMySchema}>setSchema</button>
      <br />
      <br />
      <button onClick={setMyRules}>setRules</button>
      <br />
      <br />
      <button onClick={initDb}>initDb</button>
      <br />
      <br />
      <button onClick={login}>login</button>
      <br />
      <br />
      <button onClick={add}>Add</button>
      <br />
      <br />
      <button onClick={autoSign}>autoSign</button>
    </>
  )
}
