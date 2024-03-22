import WeaveDB from "weavedb-sdk"

export default function Home() {
  const CONTRACT_TX_ID = "0a6zzEve6-44WVTbHzGny8CztpxzYJUI9klIrwJ26vA"
  const COLLECTION_NAME = "wave-acl"

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
    "let create, update": {
      "resource.newData.updatedAt": {
        var: "request.block.timestamp",
      },
      "resource.newData.createdAt": {
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
        {
          "==": [
            { var: "request.block.timestamp" },
            { var: "resource.newData.updatedAt" },
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

  return (
    <>
      <button onClick={setMySchema}>setSchema</button>
      <br />
      <br />
      <button onClick={setMyRules}>setRules</button>
      <br />
      <br />
      <button onClick={add}>Add</button>
      <br />
      <br />
    </>
  )
}
