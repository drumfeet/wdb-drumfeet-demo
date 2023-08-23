import SDK_NODE from "weavedb-sdk-node"

export default async (req, res) => {
  try {
    const db = new SDK_NODE({
      contractTxId: "qjVv7dIgyvhWfWlNSZXcsIVmW49ZJmBG2cW9cPKqt3c",
    })
    await db.init()
    const tx = await db.cget("sample")
    res.status(200).json({ success: true, tx: tx })
  } catch (e) {
    res.status(200).json({ success: false, error: e })
  }
}
