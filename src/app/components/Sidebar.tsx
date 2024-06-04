"use client";
import Link from "next/link";
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
      <IoClose
        onClick={toggleSidebar}
        className="cursor-pointer text-4xl absolute right-0 mt-4 mr-8"
      />
      <ul className="flex flex-col pt-14">
        <li
          onClick={toggleSidebar}
          className={`${pathname === "/about" ? "text-primary" : ""} block `}
        >
          <Link
            href="/about"
            className="block text-black font-bold btn btn-ghost text-lg leading-10 lg:block"
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
            className="block text-black font-bold btn btn-ghost text-lg leading-10 lg:block"
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
            className="block text-black font-bold btn btn-ghost text-lg leading-10 lg:block"
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
            className="block text-black font-bold btn btn-ghost text-lg leading-10 lg:block"
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
            className="block text-black font-bold btn btn-ghost text-lg leading-10 lg:block"
          >
            CONTACT
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
