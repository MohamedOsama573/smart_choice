import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/smart choice.svg'
import { CiLogin } from "react-icons/ci";
import compare from '../../assets/Screenshot_2025-02-17_125922-removebg-preview.svg'
// import { IoSearchOutline } from "react-icons/io5";

 export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-between items-center bg-[#F8EFE6] p-3 shadow-md px-5">
      {/* Logo */}
      <Link to='/Home' className="text-2xl font-bold text-[#303030] flex items-center gap-1 font-inter text-opacity-50">
      <img src={logo} alt="logo" className="w-10 h-10" />
      Smart Choice</Link>
      {/* Search Bar */}
      <div className="w-2xl mx-4 bg-gray-50 border-1 border-blue-200  rounded-xl   hidden sm:flex">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2  border-gray-300 rounded outline-none border-0"
        />
        {/* <IoSearchOutline  className="absolute top-5"/> */}
      </div>

      {/* Navigation Links */}
      <div className={`flex items-center space-x-4 md:space-x-6 ${
          isOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto  md:bg-transparent p-4 md:p-0 z-10`}
      >
        <NavLink to='/compare' className={({ isActive }) =>
  `flex items-center gap-1 font-bold ${
    isActive
      ? 'text-black '
      : 'text-[#303030d6] hover:text-gray-500'
  }`
}>
          COMPARE
          <img src={compare} alt="compare" className="w-7 h-7 " />
        </NavLink>
        <NavLink to='/login' className={({ isActive }) =>
  `flex items-center gap-1 font-bold ${
    isActive
      ? 'text-black '
      : 'text-[#303030d6] hover:text-gray-500'
  }`
}>
          Log in
          <CiLogin className="text-amber-400 text-2xl" />
          </NavLink>
      </div>

      {/* Hamburger Menu */}
      <div
        className="md:hidden flex flex-col cursor-pointer space-y-1"
        onClick={toggleMenu}
      >
        <span
          className={`w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        ></span>
        <span
          className={`w-6 h-0.5 bg-gray-800 transition-opacity duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        ></span>
        <span
          className={`w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        ></span>
      </div>
    </nav>
  );
};

