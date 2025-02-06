import { useState } from "react";
import Image from "next/image";

import Download from "@/public/icons/download.svg";
import Heart from "@/public/icons/like.svg";
import Link from "next/link";

interface StyleCardProps {
  id: string;
  description: string;
  image: string;

  ownerAvatar: string;
  ownerName: string;
}
const StyleCard: React.FC<StyleCardProps> = ({
  id,
  description,
  image,
  ownerAvatar,
  ownerName: ownerUsername,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/content/${id}`} className="block mb-6">
        {/* Content Image */}
        <div className="relative">
          {/* Dark Overlay on Hover */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              isHovered ? "opacity-40" : "opacity-0"
            } group-hover:opacity-40 rounded-[20px]`}
          ></div>
          <Image
            src={image}
            alt={description}
            layout="responsive"
            width={300}
            height={400}
            className={`${
              isHovered ? "bg-opacity-40" : ""
            } rounded-[20px] object-cover  bg-black transition-opacity duration-300`}
          />

          {/* Hover Overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 rounded-b-[12px] px-4 py-2 flex items-center justify-between transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Save Button on Left */}
            <button className="relative bg-black text-[12px] rounded-full text-white px-5 py-5 border-gray-800 border-2">
              <span className="absolute top-3.5 right-1.5">Save</span>
            </button>

            {/* Like & Download Buttons on Right */}
            <div className="flex space-x-2">
              <button className="relative bg-black rounded-full text-white w-[45px] h-[45px]  border-gray-800 border-2">
                <Image
                  src={Heart}
                  alt="like-icon"
                  width={20}
                  height={20}
                  className="rounded-full object-cover absolute bottom-[9px] right-[10px]"
                />
              </button>
              <button className="relative bg-black rounded-full text-white w-[45px] h-[45px] border-gray-800 border-2">
                <Image
                  src={Download}
                  alt="Download-icon"
                  width={20}
                  height={20}
                  className="rounded-full object-cover absolute bottom-3 right-3"
                />
              </button>
            </div>
          </div>
        </div>
        <p className="w-[287px]  text-[18px]  font-medium mt-2 px-2 break-words">
          {description}
        </p>

        {/* Owner Info Below the Image */}
        <div className="mt-2 mb-[17px] flex items-center space-x-2">
          <Image
            src={ownerAvatar}
            alt={ownerUsername}
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <span className="text-sm text-[#959595] font-semibold">
            {ownerUsername}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default StyleCard;
