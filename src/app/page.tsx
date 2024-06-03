import Image from "next/image";
import backImg from "/public/imgs/1.jpg";
import logoImg from "/public/imgs/logo_new_v5.png";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="relative h-screen">
        <article className="relative ">
          <Image
            src={backImg}
            alt="background Image"
            className="block mr-10 h-screen object-cover"
          />
          <section className="absolute top-1/4 left-1/4 right-1/4 flex flex-col items-center">
            <div>
              <button className="btn btn-outline mb-2">
                COUCH POTATO의 운영철학
              </button>

              <div className="indicator">
                <div className="indicator-item indicator-bottom">
                  <Link href="/contact">
                    <button className="btn btn-neutral">의뢰하기</button>
                  </Link>
                </div>
                <div className="card border">
                  <div className="card-body">
                    <h2 className="card-title">신대표</h2>
                    <p className="leading-10">
                      {" "}
                      수많은 영상 업체들이 많지만, COUCH POTATO를 컨택해주신
                      것에는 단순히 제작 그 이상의 가치를 보셨기 때문이라고
                      생각해요. <br />
                      영상 콘텐츠로 전하는 브랜드의 힘을 믿습니다. <br />
                      COUCH POTATO는 전하고 싶은 메시지를 가장 잘 표현할 수 있는
                      방법을 수단과 방법을 가리지 않고 찾아내어, 기어코
                      구현시키는 팀입니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex mt-10">
              <Link href="/about">
                <button className="btn btn-secondary mr-4">회사 소개</button>
              </Link>
              <Link href="/portfolio">
                <button className="btn btn-accent mr-2">포트 폴리오</button>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
