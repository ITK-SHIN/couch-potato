"use client";
import Image from "next/image";
import Link from "next/link";
import logoImg from "/public/imgs/logo_new_v2.png";
import { IoMenu } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className="fixed flex justify-between px-8  top-0 left-0 right-0 mb-4 z-50 lg:top-4">
      <div className="w-60">
        <Link
          href="/"
          className="text-white font-black"
          onClick={() => setIsActive(false)}
        >
          <Image
            src={logoImg}
            alt={"logoImage"}
            className="block mr-10 mt-4 w-44 lg:w-60 lg:mt-0"
            width={230}
          />
        </Link>
      </div>

      <div>
        <ul className="flex">
          <li className={`${pathname === "/about" ? "text-primary" : ""}`}>
            <Link
              href="/about"
              className=" btn btn-ghost text-black font-bold  text-lg leading-10 hidden lg:block "
            >
              ABOUT
            </Link>
          </li>
          <li className={`${pathname === "/portfolio" ? "text-primary" : ""}`}>
            <Link
              href="/portfolio"
              className=" btn btn-ghost text-black font-bold  text-lg leading-10 hidden lg:block"
            >
              PORTFOLIO
            </Link>
          </li>
          <li className={`${pathname === "/process" ? "text-primary" : ""}`}>
            <Link
              href="/process"
              className=" btn btn-ghost text-black font-bold  text-lg leading-10 hidden lg:block"
            >
              PROCESS
            </Link>
          </li>
          <li className={`${pathname === "/lotation" ? "text-primary" : ""}`}>
            <Link
              href="/lotation"
              className=" btn btn-ghost text-black font-bold  text-lg leading-10 hidden lg:block"
            >
              LOTATION
            </Link>
          </li>
          <li className={`${pathname === "/contact" ? "text-primary" : ""}`}>
            <Link
              href="/contact"
              className=" btn btn-ghost text-black font-bold  text-lg leading-10 hidden lg:block"
            >
              CONTACT
            </Link>
          </li>
        </ul>

        <div className="lg:hidden  z-90">
          {isActive ? (
            <>
              <Sidebar toggleSidebar={toggleSidebar} />
            </>
          ) : (
            <>
              <IoMenu
                onClick={toggleSidebar}
                className="cursor-pointer text-4xl mt-4"
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
