"use client";

import React, { useState } from "react";
import { oregano } from "../../../localFonts/oregano/oregano";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "../../ui/button/button";
import { motion } from "framer-motion";
import { navData } from "./utils/navData";
import { router } from "next/navigation";
import { useTheme } from "next-themes";

function NavBar({ className, isExplore, isProfile }) {
  const { theme, setTheme } = useTheme();
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
        <div className="flex backdrop-blur-md  bg-opacity-50 justify-between items-center py-4 px-6 dark:bg-grayDark text-white mb-[50px]">
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

        {!isExplore && !isProfile && (
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
        {!isProfile && (
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
        )}

        {isProfile && (
          <div className="flex justify-end px-5">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_439_374)">
                    <path
                      d="M15 21.25C18.4518 21.25 21.25 18.4518 21.25 15C21.25 11.5482 18.4518 8.75 15 8.75C11.5482 8.75 8.75 11.5482 8.75 15C8.75 18.4518 11.5482 21.25 15 21.25Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15 1.25V3.75"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15 26.25V28.75"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.27499 5.27539L7.04999 7.05039"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M22.95 22.9492L24.725 24.7242"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1.25 15H3.75"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M26.25 15H28.75"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.27499 24.7242L7.04999 22.9492"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M22.95 7.05039L24.725 5.27539"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_439_374">
                      <rect width="30" height="30" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              ) : (
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.9239 25.1626C29.6703 22.9038 30.7373 20.1944 31 17.3514C28.7481 19.0159 25.9736 19.8168 23.1811 19.6086C20.3885 19.4003 17.7635 18.1967 15.7834 16.2166C13.8033 14.2365 12.5997 11.6115 12.3914 8.81894C12.1832 6.02641 12.9841 3.25189 14.6486 1C11.8056 1.26273 9.09619 2.32972 6.83743 4.07611C4.57867 5.82251 2.86399 8.17607 1.89402 10.8614C0.924058 13.5468 0.738931 16.4528 1.3603 19.2395C1.98167 22.0262 3.38384 24.5784 5.40274 26.5973C7.42164 28.6162 9.97376 30.0183 12.7605 30.6397C15.5472 31.2611 18.4532 31.0759 21.1386 30.106C23.8239 29.136 26.1775 27.4213 27.9239 25.1626Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
            </button>

            <button>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${theme === "dark" ? "bg-white" : "bg-black"} `}
              >
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="#1F2223"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                  stroke="#1F2223"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </nav>
    </>
  );
}

export default NavBar;
