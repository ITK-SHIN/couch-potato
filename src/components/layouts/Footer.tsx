import Image from "next/image";
import React from "react";
// import logoImg from "../../../../../public/imgs/logo_new_v2.png";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoYoutube,
} from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="footer footer-center p-4 text-gray-300 pt-10 bg-clapperboard-gray-dark h-50 border-t border-clapperboard-gray">
      <aside>
        <div className="inline-block">
          <Image
            src="/imgs/mainlogo.png"
            alt="logoImage"
            className="block"
            width={200}
            height={80}
            style={{ background: "transparent" }}
          />
        </div>
        <p className="font-bold text-white">
          대표: 신상현 <br />
          사업자번호: 111-11-11111 | 메일: bano1123@naver.com | 전화:
          010-8480-4376
        </p>
        <p className="text-gray-300">주소: 경기도 김포시 </p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="/">
            <IoLogoFacebook className="text-3xl text-gray-300 hover:text-potato-orange transition-colors duration-300" />
          </a>
          <a
            href="https://www.youtube.com/@TryToShinDirect./videos"
            target="_blank"
          >
            <IoLogoYoutube className="text-3xl text-gray-300 hover:text-potato-orange transition-colors duration-300" />
          </a>
          <a href="/">
            <IoLogoInstagram className="text-3xl text-gray-300 hover:text-potato-orange transition-colors duration-300" />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
