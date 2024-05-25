import React from "react";
import bg from "/public/imgs/about3.jpg";
import Image from "next/image";
import logoImg from "/public/imgs/logo_new_v5.png";
import Link from "next/link";

const page = () => {
  return (
    <main className="relative">
      <article className="relative ">
        <Image src={bg} alt="background Image" className="block mr-10 " />
        <section className="absolute top-1/4 left-1/4 right-1/4 flex flex-col items-center">
          <div>
            <button className="btn btn-outline mb-2 text-2xl">About</button>

            <div className="indicator">
              <div className="indicator-item indicator-bottom">
                <Link href="/contact">
                  <button className="btn btn-neutral">의뢰하기</button>
                </Link>
              </div>
              <div>
                <div className="card border">
                  <div className="card-body">
                    <h2 className="card-title">대표 인사말</h2>
                    <p>
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
                <div className="card border">
                  <div className="card-body">
                    <h2 className="card-title">구성원</h2>
                    <p>
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
          </div>
        </section>
      </article>
    </main>
  );
};

export default page;
