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
        <li>
          <Link
            href="/about"
            className={`${
              pathname === "/about" ? "text-primary" : ""
            } block text-black font-bold btn btn-ghost text-base leading-10 p-0 lg:block`}
            onClick={toggleSidebar}
          >
            ABOUT
          </Link>
        </li>
        <li>
          <Link
            href="/portfolio"
            className={`${
              pathname === "/portfolio" ? "text-primary" : ""
            } block text-black font-bold btn btn-ghost text-base leading-10 p-0 lg:block`}
            onClick={toggleSidebar}
          >
            PORTFOLIO
          </Link>
        </li>
        <li>
          <Link
            href="/process"
            className={`${
              pathname === "/process" ? "text-primary" : ""
            } block text-black font-bold btn btn-ghost text-base leading-10 p-0 lg:block`}
            onClick={toggleSidebar}
          >
            PROCESS
          </Link>
        </li>
        <li>
          <Link
            href="/lotation"
            className={`${
              pathname === "/lotation" ? "text-primary" : ""
            } block text-black font-bold btn btn-ghost text-base leading-10 p-0 lg:block`}
            onClick={toggleSidebar}
          >
            LOTATION
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={`${
              pathname === "/contact" ? "text-primary" : ""
            } block text-black font-bold btn btn-ghost text-base leading-10 p-0 lg:block`}
            onClick={toggleSidebar}
          >
            CONTACT
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
