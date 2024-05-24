import Image from "next/image";
import Link from "next/link";
import React from "react";
import logoImg from "/public/imgs/logo_v5.png";

const Navbar = () => {
  return (
    <nav className="flex justify-between px-8 fixed top-4 left-0 right-0 ">
      <div className="navbar ">
        <Link href="/" className="text-white font-black">
          <Image
            src={logoImg}
            alt={"logoImage"}
            className="block mr-10"
            width={250}
          />
        </Link>
      </div>

      <ul className="flex">
        <Link href="/about">
          <li className="mr-2 ml-4  text-black font-bold btn btn-ghost">
            ABOUT
          </li>
        </Link>
        <Link href="/portfolio">
          <li className="mr-2 text-black font-bold btn btn-ghost">PORTFOLIO</li>
        </Link>
        <Link href="/process">
          <li className="mr-2 text-blacc font-bold btn btn-ghost">PROCESS</li>
        </Link>
        <Link href="/lotation">
          <li className=" text-black font-bold btn btn-ghost">LOTATION</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
