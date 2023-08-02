import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MdRoomService } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import {
  AiOutlineFileText,
  AiOutlineStop,
  AiOutlineProfile,
  AiOutlineBlock,
  AiFillAccountBook,
  AiFillCaretDown,
} from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import Cookies from "js-cookie";
import axios from "axios";

export function Navbar({ brandName, routes, action }) {
  const [openNav, setOpenNav] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = Cookies.get("id"); // Replace with the user ID you want to fetch

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/registeruser/create/${userId}/?format=json`
        );
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownItemClick = () => {
    setShowDropdown(false);
  };

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 text-black text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="inherit"
        className="capitalize"
      >
        <button
          className="flex items-center gap-1 p-1 font-normal focus:outline-none"
          onClick={toggleDropdown}
        >
          <MdRoomService className="mr-1 h-[18px] w-[18px] opacity-75" />
          <span className="flex items-center gap-1 p-1 font-normal">
            Features
          </span>
          <AiFillCaretDown />
        </button>
        {showDropdown && (
          <ul className="absolute left-[400px] mt-2 h-max w-60 overflow-y-auto rounded-lg bg-white text-black shadow-lg">
            {/* Dropdown menu items */}
            <li className="px-3 py-2 hover:bg-gray-100">
              <Link
                to="/search"
                className="flex items-center gap-1 p-1 font-normal focus:outline-none"
                onClick={handleDropdownItemClick}
              >
                <button className="flex items-center gap-1 p-1 font-normal">
                  <FiSearch className="mr-1 h-[18px] w-[18px] text-indigo-700 opacity-75" />
                  <span className="flex items-center gap-1 font-bold text-gray-700">
                    Number Look Up
                  </span>
                </button>
              </Link>
            </li>
            <li className="px-3 py-2 hover:bg-gray-100">
              <Link
                to="/who-viewed-you"
                className="flex items-center justify-between gap-1 p-1 font-normal focus:outline-none"
                onClick={handleDropdownItemClick}
              >
                <button className="flex items-center gap-1 p-1 font-normal">
                  <AiFillAccountBook className="mr-1 h-[18px] w-[18px] text-blue-500 opacity-75" />
                  <span className="flex items-center gap-1 font-bold text-gray-700">
                    Who Viewed You
                  </span>
                </button>
                <div>
                  <AiFillStar className="text-yellow-700" />
                </div>
              </Link>
            </li>
            <li className="px-3 py-2 hover:bg-gray-100">
              <Link
                to="/spam-list"
                className="flex items-center gap-1 p-1 font-normal focus:outline-none"
                onClick={handleDropdownItemClick}
              >
                <button className="flex items-center gap-1 p-1 font-normal">
                  <AiOutlineProfile className="mr-1 h-[18px] w-[18px] text-green-700 opacity-75" />
                  <span className="flex items-center gap-1 font-bold text-gray-700">
                    Spam List
                  </span>
                </button>
              </Link>
            </li>
            <li className="px-3 py-2 hover:bg-gray-100">
              <Link
                to="/blocked-list"
                className="flex items-center gap-1 p-1 font-normal focus:outline-none"
                onClick={handleDropdownItemClick}
              >
                <button className="flex items-center gap-1 p-1 font-normal">
                  <AiOutlineBlock className="mr-1 h-[18px] w-[18px] text-red-700 opacity-75" />
                  <span className="flex items-center gap-1 font-bold text-gray-700">
                    Blocked List
                  </span>
                </button>
              </Link>
            </li>
            <li className="px-3 py-2 hover:bg-gray-100">
              <Link
                to="/search"
                className="flex items-center gap-1 p-1 font-normal focus:outline-none"
                onClick={handleDropdownItemClick}
              >
                <button className="flex items-center gap-1 p-1 font-normal">
                  <AiOutlineFileText className="mr-1 h-[18px] w-[18px] text-green-700 opacity-75" />
                  <span className="flex items-center gap-1 font-bold text-gray-700">
                    Create Spam
                  </span>
                </button>
              </Link>
            </li>
            <li className="px-3 py-2 hover:bg-gray-100">
              <Link
                to="/search"
                className="flex items-center gap-1 p-1 font-normal focus:outline-none"
                onClick={handleDropdownItemClick}
              >
                <button className="flex items-center gap-1 p-1 font-normal">
                  <AiOutlineStop className="mr-1 h-[18px] w-[18px] text-red-700 opacity-75" />
                  <span className="flex items-center gap-1 font-bold text-gray-700">
                    Block Number
                  </span>
                </button>
              </Link>
            </li>
          </ul>
        )}
      </Typography>

      {routes.map(({ name, path, icon, href, target }) => (
        <Typography
          key={name}
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
        >
          {href ? (
            <a
              href={href}
              target={target}
              className="flex items-center gap-1 p-1 font-normal"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-75 mr-1",
                })}
              {name}
            </a>
          ) : (
            <Link
              to={path}
              target={target}
              className="flex items-center gap-1 p-1 font-normal"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-75 mr-1",
                })}
              {name}
            </Link>
          )}
        </Typography>
      ))}
    </ul>
  );

  return (
    <MTNavbar color="transparent" className="p-3 ">
      <div className="container mx-auto flex items-center justify-between text-white">
        <Link to="/">
          <Typography className="ml-2 mr-4 cursor-pointer py-1.5 font-body text-3xl">
            {brandName}
          </Typography>
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <div className="hidden gap-2 lg:flex">
          {userData ? (
            <a href="/profile">
              <Button variant="text" size="sm" color="white" fullWidth>
                <h1 className="text-md rounded-md bg-blue-500 p-2">
                  {userData.name}
                </h1>
              </Button>
            </a>
          ) : (
            <Link to="/pricing">
              <button className="rounded-md bg-blue-500 px-4 py-2 text-white">
                Get Premium
              </button>
            </Link>
          )}
        </div>

        <IconButton
          variant="text"
          size="sm"
          color="white"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      {/* <MobileNav
        className="rounded-xl bg-white px-4 pb-4 pt-2 text-blue-gray-900"
        open={openNav}
      >
        <div className="container mx-auto">
          {navList}
          {userData ? (
            <a href="/profile">
              <Button variant="text" size="sm" color="white" fullWidth>
                <h1 className="text-md rounded-md bg-blue-500 p-2">
                  {userData.name}
                </h1>
              </Button>
            </a>
          ) : null}
          {React.cloneElement(action, {
            className: "w-full block",
          })}
        </div>
      </MobileNav> */}
    </MTNavbar>
  );
}

Navbar.defaultProps = {
  brandName: "KnowCaller",
  action: <a href="/profile"></a>,
};

Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
