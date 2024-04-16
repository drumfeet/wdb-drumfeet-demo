const SDK = require("weavedb-sdk-node")
const main = async () => {
  const db = new SDK({
    contractTxId: "tbg8t02nuUl_KahdVcOd6lxDeFDgtEQnVIyyqR8i8Nw",
    nocache: true,
  })
  await db.init()

  const schema = {
    type: "object",
    required: [],
    properties: {
      chainId: {
        type: "string",
      },
      type: {
        type: "string",
      },
      transactionIndex: {
        type: "number",
      },
      transactionHash: {
        type: "string",
      },
      tokenAddress: {
        type: "string",
      },
      senderAddress: {
        type: "string",
      },
      receiverAddress: {
        type: "string",
      },
      tokenId: {
        type: "string",
      },
      amount: {
        type: "string",
      },
    },
  }

  const txAddSchema = await db.setSchema(schema, "people", {
    privateKey:
      "your_private_key",
  })
  console.log("txAddSchema", txAddSchema)
  process.exit()
}
main()
