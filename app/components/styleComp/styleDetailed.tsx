import { useRouter } from "next/navigation";
import Image from "next/image";
import Download from "@/public/icons/download.svg";
import Heart from "@/public/icons/like.svg";
import arrowBack from "@/public/icons/arrowBack.png";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Owner {
  name?: string;
  username?: string;
  profileImage?: string;
}

interface StyleDetailCardProps {
  id: string;
  coverImage: string;
  additionalImages: string[];
  description: string;
  owner: Owner;
  title?: string;
}

const StyleDetailCard: React.FC<StyleDetailCardProps> = ({
  coverImage,
  additionalImages,
  description,
  owner,
  title,
}) => {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const handleBack = () => {
    router.back();
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleImageHover = (image: string | null) => {
    setHoveredImage(image);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="relative flex flex-col lg:flex-row max-w-7xl mx-auto min-h-screen bg-grayDark shadow-xl rounded-lg overflow-hidden font-lexend"
    >
      {/* Left Section - Image Gallery */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Main Image */}
        <div className="relative w-full h-[50vh] lg:h-[70vh]">
          <Image
            src={hoveredImage || selectedImage || coverImage}
            alt={description}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none transition-opacity duration-300"
            priority
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm w-10 h-10 z-20 flex items-center justify-center rounded-full shadow-lg hover:bg-black/60 transition-colors"
            aria-label="Go back"
          >
            <Image width={10} height={25} alt="Back" src={arrowBack} />
          </motion.button>
        </div>

        {/* Additional Images Gallery */}
        {additionalImages && additionalImages.length > 0 && (
          <div className="w-full p-4 bg-grayDark border-t border-white/10">
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleImageClick(coverImage)}
                onMouseEnter={() => handleImageHover(coverImage)}
                onMouseLeave={() => handleImageHover(null)}
                className={`relative flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                  !selectedImage ? "ring-2 ring-burgundy-600" : ""
                } ${
                  hoveredImage === coverImage ? "ring-2 ring-burgundy-600" : ""
                }`}
              >
                <Image
                  src={coverImage}
                  alt="Main image"
                  layout="fill"
                  objectFit="cover"
                  className="hover:opacity-90 transition-opacity"
                />
              </motion.div>
              {additionalImages.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleImageClick(image)}
                  onMouseEnter={() => handleImageHover(image)}
                  onMouseLeave={() => handleImageHover(null)}
                  className={`relative flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                    selectedImage === image ? "ring-2 ring-burgundy-600" : ""
                  } ${
                    hoveredImage === image ? "ring-2 ring-burgundy-600" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Additional image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="hover:opacity-90 transition-opacity"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Section - Details */}
      <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col justify-between bg-grayDark">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex justify-between items-center">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl sm:text-2xl font-bold text-white"
            >
              {title || "Untitled look"}
            </motion.h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSaved(!isSaved)}
              className={`relative px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                isSaved
                  ? "bg-burgundy-600 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {isSaved ? "Saved" : "Save"}
            </motion.button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-white/70 leading-relaxed"
          >
            {description}
          </motion.p>

          {/* Owner Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center p-3 sm:p-4 bg-white/[0.04] border border-white/10 rounded-xl"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
              {owner?.profileImage ? (
                <Image
                  src={owner.profileImage}
                  alt={owner.username || "Creator"}
                  layout="fill"
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-burgundy-400 to-burgundy-800" />
              )}
            </div>
            <div className="ml-3 sm:ml-4 flex-grow min-w-0">
              <p className="truncate text-base sm:text-lg font-semibold text-white">
                {owner?.name || owner?.username || "Creator"}
              </p>
              {owner?.username && (
                <p className="truncate text-xs sm:text-sm text-white/50">
                  @{owner.username}
                </p>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                isFollowing
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-burgundy-600 text-white hover:bg-burgundy-700"
              }`}
            >
              {isFollowing ? "Following" : "Follow"}
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10"
        >
          <div className="flex items-center space-x-3 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                isLiked
                  ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              <Image
                src={Heart}
                alt="Like"
                width={20}
                height={20}
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </motion.button>
            <span className="text-xs sm:text-sm text-white/50">
              {isLiked ? "Liked" : "Like"}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-burgundy-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-burgundy-700 transition-colors text-sm"
          >
            <Image
              src={Download}
              alt="Download"
              width={16}
              height={16}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            <span className="ml-2 font-medium">Download</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Full Screen Image View */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full h-full max-w-7xl max-h-[90vh] m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Full size image"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full shadow-lg hover:bg-black/60 transition-colors"
                aria-label="Close full screen view"
              >
                <span className="text-xl sm:text-2xl">×</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StyleDetailCard;
