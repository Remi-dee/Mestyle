"use client";

import React, { useState, useEffect } from "react";
import { oregano } from "../../../localFonts/oregano/oregano";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "../../ui/button/Button";
import { motion, AnimatePresence } from "framer-motion";
import { navData } from "./utils/navData";
import { useTheme } from "next-themes";
import userLight from "@/public/icons/user.png";
import userDark from "@/public/icons/userDark.png";
import Image from "next/image";
import Search from "@/public/icons/search.svg";
import { useGetCurrentUserQuery } from "@/app/redux/features/user/user.api";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import ProfileDropdown from "./ProfileDown";

interface NavBarProps {
  className?: string;
  isExplore?: boolean;
  isProfile?: boolean;
}

interface MobileNavProps {
  openHamburger: boolean;
  setOpenHamburger: (value: boolean) => void;
  pathname: string;
  router: ReturnType<typeof useRouter>;
}

interface SearchBarProps {
  isSearch: boolean;
  setIsSearch: (value: boolean) => void;
}

interface ProfileSectionProps {
  signedInProfile: {
    username: string;
    profileImage: string;
    email: string;
  } | null;
  dropdownOpen: boolean;
  setDropdownOpen: (value: boolean) => void;
  router: ReturnType<typeof useRouter>;
}

// Mobile Navigation Component
const MobileNav: React.FC<MobileNavProps> = ({
  openHamburger,
  setOpenHamburger,
  pathname,
  router,
}) => {
  return (
    <nav className="block lg:hidden font-lexend">
      <div className="flex backdrop-blur-md bg-opacity-50 justify-between items-center py-4  dark:bg-grayDark text-white mb-[50px] sticky top-0 z-[200]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Logo"
          title="Logo"
          onClick={(e) => {
            e.preventDefault();
            router.push("/");
          }}
          style={oregano.style}
          className="text-3xl bg-gradient-to-r from-transparent to-white text-transparent bg-clip-text"
        >
          MeStyle
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpenHamburger(!openHamburger)}
          className="z-[250] p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label={openHamburger ? "Close menu" : "Open menu"}
        >
          {openHamburger ? (
            <p className="text-xl font-bold">X</p>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="23"
              viewBox="0 0 29 23"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-300"
            >
              <path
                d="M1 1.12891H28"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M1 11.5H28"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M1 21.873H28"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </motion.button>
      </div>
      <AnimatePresence>
        {openHamburger && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed top-0 left-0 z-[300] h-screen w-10/12 overflow-hidden backdrop-blur-md bg-opacity-80 bg-grayDark text-white lg:hidden"
          >
            <div className="relative h-full">
              <ul className="flex flex-col items-center justify-center h-screen space-y-6 text-sm font-bold uppercase">
                {navData.map(({ href, id, text }) => (
                  <motion.li
                    key={id}
                    whileHover={{ scale: 1.1 }}
                    className={`${
                      pathname === href
                        ? "text-white border-b border-b-white"
                        : ""
                    }`}
                  >
                    <Link href={href}>{text}</Link>
                  </motion.li>
                ))}
              </ul>
              <div className="absolute bottom-8 left-0 right-0 mx-auto space-y-4 text-sm text-bold px-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="secondary"
                    onClick={() => router.push("/?view=signin")}
                    className="w-full"
                  >
                    Login
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="primary" className="w-full">
                    Get Started
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Search Component
const SearchBar: React.FC<SearchBarProps> = ({ isSearch, setIsSearch }) => {
  return (
    <div
      className={`${
        isSearch && "flex-grow"
      } justify-between px-3 py-[4px] text-white bg-gray-800 bg-opacity-5 rounded-[15px] items-center gap-2.5 inline-flex`}
    >
      {isSearch ? (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSearch(false)}
            className="px-2 py-0.5 bg-black rounded-full text-white hover:bg-gray-950"
            aria-label="Close search"
          >
            ✕
          </button>
          <input
            name="search"
            id="search"
            type="text"
            autoComplete="on"
            className="px-4 py-3 text-white bg-gray-800 bg-opacity-5 rounded-[10px] border-none font-normal w-[1108px] leading-normal"
            placeholder="Search your next outfit..."
          />
        </div>
      ) : (
        <button
          className="bg-transparent w-[30px] rounded-full p-2 border border-zinc-600"
          onClick={() => setIsSearch(true)}
          aria-label="Open search"
        >
          <Image src={Search} alt="Search" className="w-[25px] h-auto" />
        </button>
      )}
    </div>
  );
};

// Profile Component
const ProfileSection: React.FC<ProfileSectionProps> = ({
  signedInProfile,
  dropdownOpen,
  setDropdownOpen,
  router,
}) => {
  return (
    <div
      className="relative flex items-center cursor-pointer border-2 border-zinc-600 px-2 py-1 rounded-full hover:bg-zinc-800 transition-all duration-300"
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      {signedInProfile?.profileImage ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/profile")}
          aria-label="Go to profile"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={signedInProfile.profileImage}
            alt="Profile Image"
            width={30}
            height={30}
            className="rounded-full border border-zinc-600 transition-transform duration-300 hover:scale-110"
          />
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Default profile"
          className="overflow-hidden rounded-full"
        >
          <div className="relative p-2 w-[40px] h-[40px] rounded-full border border-zinc-600 bg-zinc-800/50">
            <Image
              src={userLight}
              alt="Default profile icon"
              width={0}
              height={0}
              className="absolute w-[25px] bottom-1 left-[6px] transition-transform duration-300 hover:scale-110"
            />
          </div>
        </motion.button>
      )}
      <motion.div
        animate={{ rotate: dropdownOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {dropdownOpen ? (
          <MdOutlineKeyboardArrowUp
            className="ml-2 text-gray-500"
            size={18}
            aria-hidden="true"
          />
        ) : (
          <MdOutlineKeyboardArrowDown
            className="ml-2 text-gray-500"
            size={18}
            aria-hidden="true"
          />
        )}
      </motion.div>
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <ProfileDropdown
              username={signedInProfile?.username || ""}
              profileImage={signedInProfile?.profileImage || ""}
              email={signedInProfile?.email || ""}
              onLogout={() => {
                console.log("Logout clicked");
                // Handle logout logic here
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function NavBar({ className, isExplore, isProfile }: NavBarProps): JSX.Element {
  const { theme } = useTheme();
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [openHamburger, setOpenHamburger] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { data: signedInProfile } = useGetCurrentUserQuery({});

  // Close mobile menu when route changes
  useEffect(() => {
    setOpenHamburger(false);
  }, [pathname]);

  return (
    <>
      <MobileNav
        openHamburger={openHamburger}
        setOpenHamburger={setOpenHamburger}
        pathname={pathname}
        router={router}
      />

      <nav
        className={`hidden ${
          theme !== "dark" ? "bg-transparent" : ""
        } sticky backdrop-blur-md bg-opacity-50 top-0 z-[150] mx-auto py-6 lg:flex items-center justify-between bg-grayDark mb-[50px] ${className}`}
      >
        <motion.p
          whileHover={{ scale: 1.05 }}
          style={oregano.style}
          className={`text-4xl ${
            theme !== "dark" ? "to-black" : "to-white"
          } bg-gradient-to-r from-transparent to-white text-transparent bg-clip-text pl-5 cursor-pointer`}
          onClick={() => router.push("/")}
        >
          MeStyle
        </motion.p>

        {isExplore && (
          <input
            name="search"
            id="search"
            type="text"
            autoComplete="on"
            className="px-4 py-3 text-white bg-gray-100 bg-opacity-5 border-none font-normal w-[60%] leading-normal"
            placeholder="Search for next wedding outfit inspiration ..."
          />
        )}

        {!isExplore && !isProfile && (
          <ul className="flex space-x-8 text-white">
            {navData.map(({ href, id, text }) => (
              <motion.li
                key={id}
                whileHover={{ scale: 1.1 }}
                className={`relative ${
                  pathname === href
                    ? "text-secondary-100 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transform after:scale-x-100 after:transition-transform after:duration-300"
                    : "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                }`}
              >
                <Link href={href}>{text}</Link>
              </motion.li>
            ))}
          </ul>
        )}

        {!isProfile && (
          <div className="flex items-center justify-center space-x-6 text-sm text-bold">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="secondary"
                onClick={() => router.push("/?view=signin")}
              >
                Login
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="primary"
                onClick={() => router.push("/?view=signup")}
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        )}

        {isProfile && (
          <div className="flex justify-end px-5 gap-4">
            <SearchBar isSearch={isSearch} setIsSearch={setIsSearch} />
            {theme === "dark" ? (
              <ProfileSection
                signedInProfile={signedInProfile}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
                router={router}
              />
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Default profile"
              >
                <div className="relative p-6 w-3 h-auto rounded-full border border-zinc-600 hover:bg-zinc-800/50 transition-colors">
                  <Image
                    src={userDark}
                    alt="Default profile icon"
                    width={0}
                    height={0}
                    className="absolute bottom-1 left-[8px]"
                  />
                </div>
              </motion.button>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default NavBar;
