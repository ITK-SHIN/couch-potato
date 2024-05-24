import Image from "next/image";
import React from "react";
import logoImg from "/public/imgs/logo_new_v2.png";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoYoutube,
} from "react-icons/io5";

const footer = () => {
  return (
    <footer className="footer footer-center p-4  text-gray-400">
      <aside>
        <Image
          src={logoImg}
          alt={"logoImage"}
          className="block mr-10"
          width={200}
        />
        <p className="font-bold">
          대표: 신상현 <br />
          사업자번호: 111-11-11111 | 메일: bano1123@naver.com | 전화:
          010-8480-4376
        </p>
        <p>주소: 경기도 김포시 </p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a>
            <IoLogoFacebook className="text-3xl" />
          </a>
          <a>
            <IoLogoYoutube className="text-3xl" />
          </a>
          <a>
            <IoLogoInstagram className="text-3xl" />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default footer;
