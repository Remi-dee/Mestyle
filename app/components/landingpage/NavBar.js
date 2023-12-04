import React, { useState } from "react";
import { oregano } from "../../localFonts/oregano/oregano";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

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
      <nav className="block lg:hidden">
        <div className="flex justify-between items-center py-2 px-6 bg-black text-white">
          <p style={oregano.style} className="logo-text text-5xl">
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
          <div className="fixed top-0 left-0 z-20 h-screen w-10/12 overflow-hidden bg-black text-white lg:hidden">
            <ul className="flex flex-col items-center justify-center h-screen space-y-4 text-sm font-bold uppercase">
              {navData.map(({ href, id, text }) => (
                <li
                  key={id}
                  className={clsx(
                    pathname === href && "text-white border-b border-b-white"
                  )}
                >
                  <Link href={href}>{text}</Link>
                </li>
              ))}
            </ul>
            <div className="mx-auto space-y-4 text-sm text-bold">
              <div className="px-3 py-2 border border-gray-400">
                <button>Login</button>
              </div>
              <div className="p-3 bg-white text-black">
                <button className="" type="button">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Web View */}

      <nav className="hidden sticky top-0 z-[150] mx-auto px-24 py-4 lg:flex items-center justify-between bg-black text-white">
        <p style={oregano.style} className="logo-text text-5xl">
          MeStyle
        </p>
        <ul className="flex space-x-4 text-white">
          {navData.map(({ href, id, text }) => (
            <li
              key={id}
              className={clsx(
                pathname === href &&
                  "text-secondary-100 border-b border-b-white"
              )}
            >
              <Link href={href}>{text}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center space-x-6 text-sm text-bold">
          <div className="px-3 py-2 border border-gray-400">
            <button>Login</button>
          </div>
          <div className="p-3 bg-white text-black">
            <button className="" type="button">
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
