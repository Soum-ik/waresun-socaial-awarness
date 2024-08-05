import { BookCheck, ListChecks } from "lucide-react";
import React, { useContext, useState } from "react";
import { FaBook } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { ActiveContext } from "../Context/ActiveProvider";

const SideBar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const { toggleHamburger, isActive } = useContext(ActiveContext);



  return (
    <aside className="lg:w-[240px] z-50 relative">
      <ul
        className={`text-black bg-white w-full md:w-[250px] left-0 fixed top-24 h-full pt-4 shadow-lg lg:translate-x-0 ${isActive
          ? "translate-x-0 duration-300"
          : "translate-x-[-100%] duration-300"
          }`}
      >
        <Link to="/deshboard">
          <li
            className={`link ${pathname === "/" ? "active" : ""} flex gap-4 text-[#7e7e7e] text-xl px-8 py-3 hover:text-primary duration-300`}
            onClick={toggleHamburger}
          >
            <MdDashboard size={25} />
            Dashboard
          </li>
        </Link>
        <Link to="/deshboard/user-list">
          <li
            className={`link ${pathname === "/students" ? "active" : ""} flex items-center gap-4 text-[#7e7e7e] text-xl px-8 py-3 hover:text-primary duration-300`}
            onClick={toggleHamburger}
          >
            <PiStudentFill size={25} />
            User List
          </li>
        </Link>
        <Link to="/deshboard/business-list">
          <li
            className={`link ${pathname === "/business-list" ? "active" : ""} flex items-center gap-4 text-[#7e7e7e] text-xl px-8 py-3 hover:text-primary duration-300`}
            onClick={toggleHamburger}
          >
            {/* Uncomment and import the correct icon */}
            <ListChecks size={25} />
            Business list
          </li>
        </Link>
        <Link to="/deshboard/campaign-list">
          <li
            className={`link ${pathname === "/results" ? "active" : ""} flex items-center gap-4 text-[#7e7e7e] text-xl px-8 py-3 hover:text-primary duration-300`}
            onClick={toggleHamburger}
          >
            {/* Uncomment and import the correct icon */}
            <BookCheck size={25} />
            Campaign list
          </li>
        </Link>

      </ul>
    </aside>
  );
};

export default SideBar;
