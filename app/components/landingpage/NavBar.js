import React, { useState } from "react";
import { oregano } from "../../localFonts/oregano/oregano";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../ui/button/template";
import { motion } from "framer-motion";

const navData = [
  {
    id: "1",
    text: "Home",
    href: "/",
  },
  {
    id: "2",
    text: "About Us",
    href: "/about-us",
  },
  {
    id: "3",
    text: "Contact Us",
    href: "/contact",
  },
];

function NavBar() {
  const [openHamburger, setOpenHamburger] = useState(false);
  const openMobileNav = () => {
    setOpenHamburger((prevIsOpen) => !prevIsOpen);
  };

  const pathname = usePathname();
  return (
    <>
      {/* Mobile View */}
      <nav className="block lg:hidden font-lexend">
        <div className="flex justify-between items-center py-4 px-6 bg-grayDark text-white mb-[50px]">
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
          <div className="fixed top-0 left-0 z-20 h-screen w-10/12 overflow-hidden bg-grayDark text-white lg:hidden">
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
              <Button variant="inverted"> Login</Button>
              <Button variant="primary">Get Started</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Web View */}

      <nav className="hidden sticky top-0 z-[150] mx-auto px-24 py-6 lg:flex items-center justify-between bg-grayDark mb-[50px] ">
        <p
          style={oregano.style}
          className="text-4xl bg-gradient-to-r from-transparent to-white text-transparent bg-clip-text "
        >
          MeStyle
        </p>
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
              <Link href={href}>{text}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center space-x-6 text-sm text-bold">
          <Button variant="inverted"> Login</Button>
          <Button variant="primary">Get Started</Button>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
