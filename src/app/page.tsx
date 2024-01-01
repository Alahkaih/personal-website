import Image from "next/image"
export default function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <p>
        <span className="text-black">{" This is Alahkaih's personal website."}</span>
        <span className="text-black">{" It is currently a work in progress. "}</span>
        <span className="text-black">{" Check back later"}</span>
        <span className="text-black">{" for updates."}</span>
      </p>
      <Image src={"/funnyRaccoon.jpg"} alt="Raccoon" width={500} height={500}/>
    </div>
  )
}
