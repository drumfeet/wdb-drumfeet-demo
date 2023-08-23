import Link from "next/link"

export default function Home() {
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
        <Link href="/add-person">add person</Link>

        <br />
        <br />
        <Link href="/auto-sign">auto sign</Link>

        <br />
        <br />
        <Link href="/gordon">gordon</Link>

        <br />
        <br />
        <Link href="/prate11rr">prate11rr</Link>

        <br />
        <br />
        <Link href="/qudusayo">qudusayo</Link>
        
        <br />
        <br />
        <Link href="/spacedev">spacedev</Link>

        <br />
        <br />
        <Link href="/nftcanvases">nftcanvases</Link>
      </div>
    </>
  )
}
