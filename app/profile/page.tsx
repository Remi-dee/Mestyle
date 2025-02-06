"use client";

import Image from "next/image";
import { useState } from "react";
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

  // Fetch the signed-in user's profile if no userId is passed and the user is authenticated
  const {
    data: signedInProfile,
    isLoading: signedInLoading,
    error: signedInError,
  } = useGetCurrentUserQuery(undefined, {
    skip: !!userId || !access_token,
  });

  // Fetch the external user's profile if a userId is passed
  const {
    data: externalProfile,
    isLoading: externalLoading,
    error: externalError,
  } = useGetUserByIdQuery(userId, { skip: !userId });

  const profile = userId ? externalProfile : signedInProfile;
  const isLoading = signedInLoading || externalLoading;
  const error = signedInError || externalError;
  if (isLoading || stylesLoading) {
    return <p>Loading...</p>;
  }

  if (!profile) {
    return <p>Error: Unable to load profile data.</p>;
  }

  return (
    <div className="min-h-screen bg-black font-lexend">
      {/* Header Section */}
      <div className="p-6 shadow-md">
        <div className="flex flex-col items-center space-x-4">
          <Image
            src={
              profile.profileImage ||
              "/images/medium-shot-woman-with-yellow-suit-2.png"
            }
            alt="Profile"
            width={300}
            height={100}
            className="rounded-full"
          />
          <div className="text-center">
            <h1 className="text-2xl font-bold">{profile.userName}</h1>
            <p className="text-gray-500">@{profile.email.split("@")[0]}</p>
            <p className="mt-2 text-sm">{profile.bio}</p>
          </div>
          <button className="ml-auto px-4 py-2 bg-white text-black rounded-md">
            Follow
          </button>
          <p>Joined: {new Date(profile.createdAt).toLocaleDateString()}</p>
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
