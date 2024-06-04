"use client";
import Link from "next/link";
import Image from "next/image";
import logoImg from "/public/imgs/logo_new_v2.png";

import { usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";

type SidebarProps = {
  toggleSidebar: () => void;
};

const Sidebar = ({ toggleSidebar }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside
      className="absolute left-0 top-0 w-full  z-50 bg-black "
      style={{ backgroundColor: "white" }}
    >
      <div className="flex">
        <Link
          href="/"
          className="text-white font-black"
          onClick={toggleSidebar}
        >
          <Image
            src={logoImg}
            alt={"logoImage"}
            className="block ml-8 mt-4 w-44 lg:w-60 lg:mt-0"
            width={230}
          />
        </Link>
        <IoClose
          onClick={toggleSidebar}
          className="cursor-pointer text-4xl absolute right-0 mt-4 mr-8"
        />
      </div>
      <ul className="flex flex-col pt-2">
        <li
          onClick={toggleSidebar}
          className={`${pathname === "/about" ? "text-primary" : ""} block `}
        >
          <Link
            href="/about"
            className="block text-black font-bold btn btn-ghost text-base leading-10 lg:block"
          >
            ABOUT
          </Link>
        </li>
        <li
          onClick={toggleSidebar}
          className={`${pathname === "/portfolio" ? "text-primary" : ""}`}
        >
          <Link
            href="/portfolio"
            className="block text-black font-bold btn btn-ghost text-base leading-10 lg:block"
          >
            PORTFOLIO
          </Link>
        </li>
        <li
          onClick={toggleSidebar}
          className={`${pathname === "/process" ? "text-primary" : ""}`}
        >
          <Link
            href="/process"
            className="block text-black font-bold btn btn-ghost text-base leading-10 lg:block"
          >
            PROCESS
          </Link>
        </li>
        <li
          onClick={toggleSidebar}
          className={`${pathname === "/lotation" ? "text-primary" : ""}`}
        >
          <Link
            href="/lotation"
            className="block text-black font-bold btn btn-ghost text-base leading-10 lg:block"
          >
            LOTATION
          </Link>
        </li>
        <li
          onClick={toggleSidebar}
          className={`${pathname === "/contact" ? "text-primary" : ""}`}
        >
          <Link
            href="/contact"
            className="block text-black font-bold btn btn-ghost text-base leading-10 lg:block"
          >
            CONTACT
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
