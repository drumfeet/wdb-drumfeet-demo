import WeaveDB from "weavedb-sdk"

export default function Home() {
  const CONTRACT_TX_ID = "hdnrB5USC2aiqBr48jJfQ4W9EO1Kbm4-uSWe15f_F1k"
  const COLLECTION_NAME = "projects"

  const start = async () => {
    try {
      const db = new WeaveDB({
        contractTxId: CONTRACT_TX_ID,
      })
      await db.init()

      // generate temp address
      const { identity } = await db.createTempAddress()
      console.log("identity", identity)

      //wait for 4 seconds
      await new Promise((resolve) => {
        setTimeout(resolve, 4000)
      })

      const data = {
        logoAziendaListFiles: ["WacPLKDYRBLtNWUS2M_RCwE1I5B6YOhrY3JSREcawXQ"],
        documentazioneListFiles: [
          "FsRtqfPSafFhI5tcR9eEqwxFtqNKX_Na35tDP17bR9k",
        ],
        imageNftDefListFiles: [
          {
            name: "Test brave",
            description: "Test brave",
            image: "ar://ZxeVu4NXtzhRoH7yG1-aaNsPA-avDgKi7j0K4elD9-8",
            specs: "Test brave",
            price: "2",
            supply: 50,
            uri: "rivtCGb0AnlxnvA_exy5SLPJtQGKOHFWyDl4jKVGWFI",
          },
        ],
        giorniCampagna: "45",
        numeroProdotti: "1",
        tipoCampagna: "reward",
        settore: "tipo17",
        socialMedia: ["Test from brave"],
        titoloRoadStep: ["ss"],
        descrRoadStep: ["Test from brave"],
        titoloDomanda: ["Test brave"],
        rispostaDomanda: ["Test from brave"],
        nomeAzienda: "Test from brave",
        nazioneAzienda: "CA",
        descrizione: "Test from brave",
        pIva: "Test from brave",
        sito: "Test from brave",
        introduzione: "Test from brave",
        storia: "Test from brave",
        vision: "Test from brave",
        quota: "100",
        descProgetto: "Test brave",
        obbProgetto: "Test brave",
        team: "Test brave",
        name1: "Test brave",
        description1: "Test brave",
        specs1: "Test brave",
        price1: "2",
        supply1: "50",
        fotoProdotto1ListFiles: ["_tOntqIYVHokZp3cRb0I4SxvqTm491tDRCaFY6G3VBI"],
        addressCreator: "0xCe126Ae2d641c4e2Ac2E7F12Ec309682Af682B67",
        address: "0x6C68949e24BC18dAA7B9ef9BeD62c32E699894B5",
        domanda: [
          [
            "Test from brave",
            "Test from brave",
            "Test from brave",
            "Test from brave",
            "Test from brave",
            "Test from brave",
            "Test from brave",
            "Test from brave",
            "Test from brave",
            "Test from brave",
          ],
        ],
      }

      const result = await db.set(
        data,
        COLLECTION_NAME,
        "0x6C68949e24BC18dAA7B9ef9BeD62c32E699894B5",
        identity //query DB with the temporary address
      )
      console.log("result", result)

      //wait for 2 seconds
      await new Promise((resolve) => {
        setTimeout(resolve, 2000)
      })

      //fetch documents
      const result2 = await db.get(COLLECTION_NAME)
      console.log("result2", result2)
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
