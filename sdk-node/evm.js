const WeaveDB = require("weavedb-sdk-node")
CONTRACT_TX_ID = "Hta_2gK02gkuA006mPvGInddYvQAWKbOR4_RpGbRw90"

function stringToUint8Array32(str) {
  // Encode the string to a Uint8Array
  const encoder = new TextEncoder()
  let uint8Array = encoder.encode(str)

  // Ensure the Uint8Array is exactly 32 bytes long
  if (uint8Array.length > 32) {
    // Truncate if longer than 32 bytes
    uint8Array = uint8Array.slice(0, 32)
  } else if (uint8Array.length < 32) {
    // Pad with zeros if shorter than 32 bytes
    let paddedArray = new Uint8Array(32)
    paddedArray.set(uint8Array)
    uint8Array = paddedArray
  }

  return uint8Array
}

const wallet = {
  getAddressString: () => "REPLACE_THIS".toLowerCase(),
  getPrivateKey: () => stringToUint8Array32("REPLACE_THIS"),
}

async function main() {
  try {
    const db = new WeaveDB({ contractTxId: CONTRACT_TX_ID })
    await db.init()

    db.setDefaultWallet(wallet, "evm")

    const result = await db.upsert({ name: "drumfeet1" }, "test", "drumfeet1")
    console.log("result", result)
  } catch (error) {
    console.error("An error occurred:", error)
  } finally {
    process.exit(0)
  }
}

main()
