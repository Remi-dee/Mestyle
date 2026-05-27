"use client";

import React from "react";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import Image from "next/image";

interface ProfileDropdownProps {
  username: string;
  email: string;
  profileImage: string;
  onLogout: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  username,
  profileImage,
  email,
  onLogout,
}) => {
  return (
    <div className="absolute right-0 top-12 w-64 rounded-xl backdrop-filter backdrop-blur-md bg-black/40 border border-zinc-600/50 shadow-lg z-50">
      {/* Profile Info */}
      <div className="flex items-center space-x-3 border-b border-white/10 pb-3 px-4 pt-4">
        {profileImage ? (
          <Image
            src={profileImage}
            alt="User Avatar"
            width={36}
            height={36}
            className="rounded-full"
          />
        ) : (
          <div className="rounded-full bg-white/20 p-2">
            <AiOutlineUser size={20} className="text-white" />
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-white">{username}</p>
          <p className="text-xs text-gray-300">{email}</p>
        </div>
      </div>

      {/* Menu Items */}
      <ul className="mt-3">
        <li>
          <Link
            href="/profile"
            className="flex items-center py-2 px-4 hover:bg-white/10 transition"
          >
            <div className="bg-blue-400/20 p-2 rounded-full mr-2">
              <AiOutlineUser className="text-blue-300" />
            </div>
            <span className="text-sm">My Profile</span>
          </Link>
        </li>
        <li>
          <Link
            href="/orders"
            className="flex items-center py-2 px-4 hover:bg-white/10 transition"
          >
            <div className="bg-purple-400/20 p-2 rounded-full mr-2">
              <HiOutlineShoppingBag className="text-purple-300" />
            </div>
            <span className="text-sm">My Orders</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard"
            className="flex items-center py-2 px-4 hover:bg-white/10 transition"
          >
            <div className="bg-green-400/20 p-2 rounded-full mr-2">
              <MdOutlineDashboard className="text-green-300" />
            </div>
            <span className="text-sm">Seller Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            href="/invite"
            className="flex items-center py-2 px-4 hover:bg-white/10 transition"
          >
            <div className="bg-yellow-400/20 p-2 rounded-full mr-2">
              <FaUserFriends className="text-yellow-300" />
            </div>
            <span className="text-sm">Invite Friends</span>
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className="flex items-center py-2 px-4 hover:bg-white/10 transition"
          >
            <div className="bg-gray-400/20 p-2 rounded-full mr-2">
              <IoSettingsOutline className="text-gray-300" />
            </div>
            <span className="text-sm">Settings</span>
          </Link>
        </li>
        <li>
          <button
            onClick={onLogout}
            className="w-full flex items-center py-2 px-4 text-red-400 hover:bg-white/10 transition"
          >
            <div className="bg-red-400/20 p-2 rounded-full mr-2">
              <FiLogOut className="text-red-300" />
            </div>
            <span className="text-sm">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
