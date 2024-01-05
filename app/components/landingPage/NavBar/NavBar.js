import React, { useState } from "react";
import { oregano } from "../../../localFonts/oregano/oregano";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "../../ui/button/button";
import { motion } from "framer-motion";
import { navData } from "./utils/navData";
import { Router } from "next/router";

function NavBar({ className, isExplore, isProfile }) {
  const [openHamburger, setOpenHamburger] = useState(false);
  const openMobileNav = () => {
    setOpenHamburger((prevIsOpen) => !prevIsOpen);
  };
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      {/* Mobile View */}
      <nav className="block lg:hidden font-lexend">
        <div className="flex backdrop-blur-md  bg-opacity-50 justify-between items-center py-4 px-6 bg-grayDark text-white mb-[50px]">
          <p
            style={oregano.style}
            className=" text-3xl bg-gradient-to-r from-transparent to-white text-transparent bg-clip-text"
          >
            MeStyle
          </p>
          <button onClick={openMobileNav} className="z-30">
            {openHamburger ? (
              <p className="text-xl font-bold">X</p>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="23"
                viewBox="0 0 29 23"
                fill="none"
              >
                <path
                  d="M1 1.12891H28"
                  stroke="white"
                  stroke-width="2"
                  strokeLinecap="round"
                />
                <path
                  d="M1 11.5H28"
                  stroke="white"
                  stroke-width="2"
                  strokeLinecap="round"
                />
                <path
                  d="M1 21.873H28"
                  stroke="white"
                  stroke-width="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
        {openHamburger && (
          <div className="fixed top-0 left-0 z-20 h-screen w-10/12 overflow-hidden backdrop-blur-md  bg-opacity-80 bg-grayDark text-white lg:hidden">
            <ul className="flex flex-col items-center justify-center h-screen space-y-4 text-sm font-bold uppercase">
              {navData.map(({ href, id, text }) => (
                <li
                  key={id}
                  className={`${
                    pathname === href
                      ? "text-white border-b border-b-white"
                      : ""
                  }`}
                >
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Link href={href}>{text}</Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <div className="mx-auto space-y-4 text-sm text-bold">
              <Button
                variant="inverted"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/?view=signIn");
                }}
              >
                {" "}
                Login
              </Button>
              <Button variant="primary">Get Started</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Web View */}

      <nav
        className={`hidden sticky backdrop-blur-md  bg-opacity-50 top-0 z-[150] mx-auto  py-6 lg:flex items-center justify-between bg-grayDark mb-[50px] ${className}`}
      >
        <p
          style={oregano.style}
          className="text-4xl bg-gradient-to-r from-transparent to-white text-transparent bg-clip-text "
        >
          MeStyle
        </p>

        {isExplore && (
          <input
            name="search"
            id="search"
            type="text"
            autoComplete="on"
            className=" px-4 py-3  text-white  bg-gray-100 bg-opacity-5  border-none  font-normal w-[60%] leading-normal  "
            placeholder="Search for next wedding outfit inspiration ..."
          />
        )}

        {!isExplore && (
          <ul className="flex space-x-4 text-white">
            {navData.map(({ href, id, text }) => (
              <li
                key={id}
                className={`${
                  pathname === href
                    ? "text-secondary-100 border-b border-b-white"
                    : ""
                }`}
              >
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link href={href}>{text}</Link>
                </motion.div>
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-center justify-center space-x-6 text-sm text-bold">
          <Button
            variant="inverted"
            onClick={(e) => {
              e.preventDefault();
              router.push("/?view=signin");
            }}
          >
            Login
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              router.push("/?view=signup");
            }}
          >
            Get Started
          </Button>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
