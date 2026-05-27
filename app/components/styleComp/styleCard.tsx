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
      className="group relative cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/content/${id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-[12px] sm:rounded-[16px] bg-black/10">
          <Image
            src={image}
            alt={description}
            layout="fill"
            objectFit="cover"
            className={`transform transition-transform duration-500 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          />

          {/* Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Action Buttons */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-2 sm:p-3 flex items-center justify-between transition-all duration-300 ${
              isHovered
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <button
              className="bg-white/90 hover:bg-white text-black px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors"
              aria-label="Save style"
            >
              Save
            </button>

            <div className="flex space-x-1 sm:space-x-2">
              <button
                className="bg-white/90 hover:bg-white text-black p-1 sm:p-1.5 rounded-full transition-colors"
                aria-label="Like style"
              >
                <Image
                  src={Heart}
                  alt="Like"
                  width={14}
                  height={14}
                  className="opacity-80 sm:w-4 sm:h-4"
                />
              </button>
              <button
                className="bg-white/90 hover:bg-white text-black p-1 sm:p-1.5 rounded-full transition-colors"
                aria-label="Download style"
              >
                <Image
                  src={Download}
                  alt="Download"
                  width={14}
                  height={14}
                  className="opacity-80 sm:w-4 sm:h-4"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mt-1.5 sm:mt-2 text-white text-[10px] sm:text-xs line-clamp-2 font-medium">
          {description}
        </p>

        {/* Owner Info */}
        <div className="mt-1.5 sm:mt-2 flex items-center space-x-1.5 sm:space-x-2">
          <div className="relative w-5 h-5 sm:w-6 sm:h-6">
            <Image
              src={ownerAvatar || "/images/default-avatar.png"}
              alt={ownerUsername}
              layout="fill"
              className="rounded-full object-cover"
            />
          </div>
          <span className="text-white/60 text-[10px] sm:text-xs font-medium truncate">
            {ownerUsername}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default StyleCard;
