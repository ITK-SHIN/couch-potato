import Image from "next/image";
import React from "react";
import logoImg from "/public/imgs/logo_new_v2.png";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoYoutube,
} from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="footer footer-center p-4  text-gray-400 pt-10 bg-black ">
      <aside>
        <Image src={logoImg} alt={"logoImage"} className="block " width={200} />
        <p className="font-bold">
          대표: 신상현 <br />
          사업자번호: 111-11-11111 | 메일: bano1123@naver.com | 전화:
          010-8480-4376
        </p>
        <p>주소: 경기도 김포시 </p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="/">
            <IoLogoFacebook className="text-3xl" />
          </a>
          <a
            href="https://www.youtube.com/@TryToShinDirect./videos"
            target="_blank"
          >
            <IoLogoYoutube className="text-3xl" />
          </a>
          <a href="/">
            <IoLogoInstagram className="text-3xl" />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
