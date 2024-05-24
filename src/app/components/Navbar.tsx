import Image from "next/image";
import Link from "next/link";
import React from "react";
import logoImg from "/public/imgs/logo_new_v2.png";

const Navbar = () => {
  return (
    <nav className="flex justify-between px-8 fixed top-4 left-0 right-0 mb-4 ">
      <div className="">
        <Link href="/" className="text-white font-black">
          <Image
            src={logoImg}
            alt={"logoImage"}
            className="block mr-10"
            width={230}
          />
        </Link>
      </div>

      <ul className="flex">
        <Link href="/about">
          <li className="mr-1 ml-4  text-black font-bold btn btn-ghost text-lg">
            ABOUT
          </li>
        </Link>
        <Link href="/portfolio">
          <li className="mr-1 text-black font-bold btn btn-ghost text-lg">
            PORTFOLIO
          </li>
        </Link>
        <Link href="/process">
          <li className="mr-1 text-black font-bold btn btn-ghost text-lg">
            PROCESS
          </li>
        </Link>
        <Link href="/lotation">
          <li className="text-black font-bold btn btn-ghost text-lg">
            LOTATION
          </li>
        </Link>
        <Link href="/contact">
          <li className="text-black font-bold btn btn-ghost text-lg">
            CONTACT
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
