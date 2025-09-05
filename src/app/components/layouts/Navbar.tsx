"use client";
import Image from "next/image";
import Link from "next/link";
// import logoImg from "../../../../../public/imgs/logo_new_v2.png";
import { IoMenu } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className="fixed flex justify-between px-8  top-0 left-0 right-0 mb-4 z-50 lg:top-4">
      <div className="w-60">
        <Link
          href="/"
          className="text-black font-black"
          onClick={() => setIsActive(false)}
        >
                  <div className="inline-block rounded-xl bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 p-3 shadow-lg">
          <Image
            src="/imgs/mainlogo.png"
            alt={"logoImage"}
            className="block  mt-4 w-44 lg:w-60 lg:mt-0"
            width={230}
            height={100}
          />
          </div>
        </Link>
      </div>

      <div>
        {/* 네비게이션 바 디자인 개선: 더 세련된 투명+그라데이션+글로우 효과, 메뉴 간격 넓힘, 폰트 강조 */}
        <div
          className="hidden lg:flex items-center px-12 py-3 rounded-full shadow-2xl border border-white/30 bg-gradient-to-r from-white/70 via-white/40 to-white/70 bg-clip-padding backdrop-blur-lg"
          style={{
            backdropFilter: "blur(18px) saturate(180%)",
            WebkitBackdropFilter: "blur(18px) saturate(180%)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 1.5px 8px 0 rgba(255, 200, 80, 0.10)",
            border: "1.5px solid rgba(255,255,255,0.25)",
          }}
        >
          <ul className="flex gap-6">
            <li>
              <Link
                href="/about"
                className={`font-extrabold text-lg tracking-wide px-6 py-2 rounded-full transition-all duration-200 shadow-sm ${
                  pathname === "/about"
                    ? "bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 text-black shadow-lg scale-105 ring-2 ring-yellow-200"
                    : "text-gray-800 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 hover:text-black hover:scale-105"
                }`}
              >
                ABOUT
              </Link>
            </li>
            <li>
              <Link
                href="/portfolio"
                className={`font-extrabold text-lg tracking-wide px-6 py-2 rounded-full transition-all duration-200 shadow-sm ${
                  pathname === "/portfolio"
                    ? "bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 text-black shadow-lg scale-105 ring-2 ring-yellow-200"
                    : "text-gray-800 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 hover:text-black hover:scale-105"
                }`}
              >
                PORTFOLIO
              </Link>
            </li>
            <li>
              <Link
                href="/process"
                className={`font-extrabold text-lg tracking-wide px-6 py-2 rounded-full transition-all duration-200 shadow-sm ${
                  pathname === "/process"
                    ? "bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 text-black shadow-lg scale-105 ring-2 ring-yellow-200"
                    : "text-gray-800 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 hover:text-black hover:scale-105"
                }`}
              >
                PROCESS
              </Link>
            </li>
            <li>
              <Link
                href="/lotation"
                className={`font-extrabold text-lg tracking-wide px-6 py-2 rounded-full transition-all duration-200 shadow-sm ${
                  pathname === "/lotation"
                    ? "bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 text-black shadow-lg scale-105 ring-2 ring-yellow-200"
                    : "text-gray-800 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 hover:text-black hover:scale-105"
                }`}
              >
                LOTATION
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`font-extrabold text-lg tracking-wide px-6 py-2 rounded-full transition-all duration-200 shadow-sm ${
                  pathname === "/contact"
                    ? "bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 text-black shadow-lg scale-105 ring-2 ring-yellow-200"
                    : "text-gray-800 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 hover:text-black hover:scale-105"
                }`}
              >
                CONTACT
              </Link>
            </li>
          </ul>
        </div>

        {/* 모바일 메뉴: 더 둥글고 그림자 강조, 아이콘에 그라데이션 효과 */}
        <div className="lg:hidden z-40">
          {isActive ? (
            <>
              <Sidebar toggleSidebar={toggleSidebar} />
            </>
          ) : (
            <div className="bg-white/90 rounded-full shadow-2xl p-3 border border-white/30 flex items-center justify-center">
              <IoMenu
                onClick={toggleSidebar}
                className="cursor-pointer text-4xl"
                style={{
                  color: "transparent",
                  background: "linear-gradient(90deg, #facc15 0%, #fb923c 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 2px 8px #facc1555)",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
