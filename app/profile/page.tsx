"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  useGetCurrentUserQuery,
  useGetUserByIdQuery,
  useGetUserProfileQuery,
  useGetUserStylesQuery,
} from "../redux/features/user/user.api";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function ProfilePage(): JSX.Element {
  const router = useRouter();
  const { userId } = useParams(); // Assuming the userId is passed in the route (e.g., /profile/:userId)
  const { user, access_token } = useSelector((state: RootState) => state.auth);

  const { data: styles, isLoading: stylesLoading } = useGetUserStylesQuery({});
  const [tab, setTab] = useState("created");
  const [userProfile, setUserProfile] = useState(null);
  // Fetch the signed-in user's profile if no userId is passed and the user is authenticated
  // const {
  //   data: signedInProfile,
  //   isLoading: signedInLoading,
  //   error: signedInError,
  // } = useGetCurrentUserQuery(undefined, {
  //   skip: !!userId || !access_token,
  // });

  const {
    data: signedInProfile,
    isLoading: signedInLoading,
    error: signedInError,
  } = useGetCurrentUserQuery({});

  // Fetch the external user's profile if a userId is passed
  const {
    data: externalProfile,
    isLoading: externalLoading,
    error: externalError,
  } = useGetUserByIdQuery(userId, { skip: !userId });

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

  const profile = userId ? externalProfile : signedInProfile;
  const isLoading = signedInLoading || externalLoading;
  const error = signedInError || externalError;
  if (isLoading || stylesLoading) {
    return <p>Loading...</p>;
  }
  console.log("our profile", userProfile);
  if (signedInError) {
    return <p>Error: Unable to load profile data.</p>;
  }
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center bg-white/10
   "
    >
      {/* Header Section */}

      <div className="w-full max-w-md px-4 mt-[96px]">
        <div className="backdrop-blur-xl  border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          <div className="relative">
            {/* Profile Picture */}
            <div className="flex justify-center pt-6">
              <Image
                src={profile?.profileImage || "/images/default-profile.png"}
                alt="Profile"
                width={150}
                height={150}
                className="w-[150px] h-[150px] rounded-full border-4 border-white/30"
              />
            </div>

            {/* Profile Details */}
            <div className="text-center text-white px-6 py-4">
              <h1 className="text-2xl font-bold">{profile?.userName}</h1>
              <p className="text-white/70 text-sm">
                @{profile?.email.split("@")[0]}
              </p>
              <p className="mt-2 text-sm text-white/80">{profile?.bio}</p>

              {/* Action Buttons */}
              <div className="mt-4 flex justify-center space-x-4">
                <button className="px-6 py-2  backdrop-blur-md text-white rounded-full border border-white/30 hover:bg-white/30 transition bg-orange-400/20 ">
                  Follow
                </button>
              </div>

              <p className="mt-4 text-sm text-white/60">
                Joined: {new Date(profile?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mt-4 p-4 shadow-md flex justify-center space-x-8">
        <button
          className={`px-4 py-2 ${
            tab === "created" ? "border-b-2 border-blue-500 text-blue-500" : ""
          }`}
          onClick={() => setTab("created")}
        >
          Created Styles
        </button>
        <button
          className={`px-4 py-2 ${
            tab === "saved" ? "border-b-2 border-blue-500 text-blue-500" : ""
          }`}
          onClick={() => setTab("saved")}
        >
          Saved Styles
        </button>
      </div>

      {/* Grid Layout */}
      <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {styles?.map((style: any) => (
          <div key={style.id} className="relative group">
            <Image
              src={style.image}
              alt={style.description}
              width={300}
              height={400}
              className="rounded-lg object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm p-2 transition-opacity">
              {style.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
