import { useRouter } from "next/navigation";
import Image from "next/image";
import Download from "@/public/icons/download.svg";
import Heart from "@/public/icons/like.svg";
import arrowBack from "@/public/icons/arrowBack.png";

interface StyleDetailCardProps {
  id: string;
  imageUrl: string;
  description: string;
  ownerAvatar: string;
  ownerName: string;
  followersCount: number;
  uploadTitle: string;
  ownerImage: string;
}

const StyleDetailCard: React.FC<StyleDetailCardProps> = ({
  id,
  imageUrl,
  description,
  ownerAvatar,
  ownerName,
  ownerImage,
  uploadTitle,
  followersCount,
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="relative flex max-w-5xl mx-auto h-screen bg-[#D9D9D9] shadow-lg rounded-lg overflow-hidden font-lexend">
      {/* Left Section - Image */}
      <div className="relative w-1/2">
        <Image
          src={imageUrl}
          alt={description}
          layout="fill"
          objectFit="cover"
          className="rounded-l-lg"
        />
      </div>

      {/* Right Section - Details */}
      <div className="w-1/2 p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mt-8">
            <h2 className="text-xl font-bold text-gray-900">{uploadTitle}</h2>{" "}
            {/* Save button */}{" "}
            <button className="relative bg-black text-[12px] rounded-full text-white px-5 py-5 border-gray-800 border-2">
              <span className="absolute top-3.5 right-1.5">Save</span>
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-2">{description}</p>

          {/* Owner Details */}
          <div className="flex items-center mt-6 text-black">
            <Image
              src={ownerImage}
              alt={ownerName}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="ml-3">
              <p className="text-lg font-semibold">{ownerName}</p>
              <p className="text-gray-500 text-sm">
                {followersCount} followers
              </p>
            </div>
            <button className="ml-auto bg-white bg-opacity-[40%] text-black px-4 py-2 rounded-lg">
              Follow
            </button>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex space-x-3 justify-end">
          <button className="flex items-center bg-[#3B9E62] text-white px-5 py-2 rounded-lg">
            <Image src={Download} alt="Download" width={20} height={20} />
            <span className="ml-2">Download</span>
          </button>
        </div>
      </div>

      <button
        onClick={handleBack}
        className="bg-[#D9D9D9] absolute top-0 left-0 w-[40px] h-12 z-20 flex items-center justify-center rounded-tl-lg"
        aria-label="Go back"
      >
        <Image width={10} height={25} alt="Back" src={arrowBack} />
      </button>
    </div>
  );
};

export default StyleDetailCard;
