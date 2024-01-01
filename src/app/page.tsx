import Image from "next/image"
export default function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <p>
        <span className="text-red-500">{" This is Alahkaih's personal website."}</span>
        <span className="text-green-500">{" It is currently a work in progress. "}</span>
        <span className="text-blue-500">{" Check back later"}</span>
        <span className="text-yellow-500">{" for updates."}</span>
      </p>
      <Image src={"/funnyRaccoon.jpg"} alt="Raccoon" width={500} height={500}/>
    </div>
  )
}
