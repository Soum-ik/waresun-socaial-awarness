// 'use client'
import { BookOpenText, CircleUserRound, } from "lucide-react";

import { useState } from "react";
import { Menu } from 'lucide-react';

import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

const Header = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleHamburger = () => {
    setIsActive(!isActive);
  };

  const remoevToken = () => {
    Cookies.remove('adminToken');

    window.location.reload();
  };



  return (
    <header className="h-24">
      <div className="border-b bg-white text-black fixed top-0 w-full z-50">
        <div className="h-24 flex items-center justify-between gap-2 px-4 md:px-8 ">
          <div className="nav-control lg:hidden">
            <div onClick={toggleHamburger} className={`${isActive ? 'hamburger active' : 'hamburger'}`} >
              <Menu />
            </div>
          </div>
          <Link to="/deshboard">
            <div className="flex items-center gap-2">
              <BookOpenText className="text-primary size-10 sm:size-12" />
              <div>
                <h1 className="text-lg sm:text-2xl font-semibold">Dashboard</h1>
                <p className="text-[12px] sm:text-sm">Social Management</p>
              </div>
            </div>
          </Link>
          <div className="w-1/3 hidden md:block">
            <input
              className="w-full py-2 px-4 border outline-none rounded-md bg-transparent"
              type="text"
              placeholder="Search here..."
            />
          </div>



          <button className=" px-3 py-2 border rounded-md">
            <h1 onClick={remoevToken}>Log Out</h1 >
          </button>



        </div>
      </div>
    </header >
  );
};

export default Header;
