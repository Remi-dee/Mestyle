import { useEffect, useState } from "react";
import Button from "../ui/button/button";
import Image from "next/image";
import Filter from "@/public/icons/filter.svg";
import Search from "@/public/icons/search.svg";
import { useGetCurrentUserQuery } from "@/app/redux/features/user/user.api";
import { useRouter } from "next/navigation";
import StylePersonaModal from "./StylePersonaModal";

function Header(): JSX.Element {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isStylePersonaOpen, setIsStylePersonaOpen] = useState<boolean>(false); // ✅ New State

  const {
    data: signedInProfile,
    isLoading: signedInLoading,
    error: signedInError,
  } = useGetCurrentUserQuery({});

  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (signedInProfile) {
      setUserProfile(signedInProfile);
    }
  }, [signedInProfile]);

  if (signedInLoading) {
    return <h1 className="text-4xl font-medium leading-tight">Loading...</h1>;
  }

  if (signedInError) {
    return (
      <h1 className="text-4xl font-medium leading-tight">
        Unable to fetch profile
      </h1>
    );
  }

  return (
    <>
      {/* 🔮 Glassmorphic Style Persona Modal */}
      {isStylePersonaOpen && (
        <StylePersonaModal
          onClose={() => setIsStylePersonaOpen(false)}
          isOpen={isStylePersonaOpen}
        />
      )}

      <div className="flex justify-between items-center text-white font-lexend mb-7 mt-[80px]">
        <div>
          {!isSearch && (
            <h1 className="text-4xl font-medium leading-tight">
              Good Afternoon {signedInProfile?.userName || "User"}
            </h1>
          )}
        </div>

        <div
          className={`${
            isSearch && "flex-grow"
          } justify-between px-4 py-3 text-white bg-gray-200 bg-opacity-5 rounded-[20px] items-center gap-2.5 inline-flex`}
        >
          {isSearch && (
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
                className="px-4 py-3 text-white bg-gray-800 bg-opacity-5 rounded-[10px] border-none text-xl font-normal w-[1108px] leading-normal"
                placeholder="Search..."
              />
            </div>
          )}

          <button
            className="bg-black rounded-[20px] p-4 border border-zinc-600"
            onClick={() => setIsStylePersonaOpen(true)} // ✅ Open Modal
          >
            <Image src={Filter} alt="Filter" className="w-[17px] h-auto" />
          </button>

          <button
            className="p-3 text-xl bg-transparent rounded-[20px] shadow-inner border border-zinc-600 items-center"
            type="button"
            onClick={() => {
              router.push("/creator");
            }}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
