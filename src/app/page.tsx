import Image from "next/image";
import backImg from "/public/imgs/1.jpg";

export default function Home() {
  return (
    <>
      <main>
        <Image src={backImg} alt="Landscape picture" className="bg-auto" />
        {/* <h1>hello couch</h1> */}
      </main>
    </>
  );
}
