"use client";

import Image from "next/image";
import { useState } from "react";
import { useGetCurrentUserQuery } from "../redux/features/user/user.api";
import { useGetMyStylesQuery } from "../redux/features/styleContent/styleApi";
import NavBar from "../components/landingPage/NavBar/NavBar";
import StyleCard from "../components/styleComp/styleCard";

function ProfilePage(): JSX.Element {
  const [tab, setTab] = useState<"created" | "saved">("created");

  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useGetCurrentUserQuery({});
  const { data: myStyles = [], isLoading: stylesLoading } = useGetMyStylesQuery({});

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-grayDark flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-burgundy-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (profileError || !profile) {
    return (
      <div className="min-h-screen bg-grayDark flex items-center justify-center text-white/70 font-lexend">
        Unable to load your profile.
      </div>
    );
  }

  const handle = profile?.email ? profile.email.split("@")[0] : profile?.username;
  const joined = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString()
    : null;
  const styles = (myStyles || []) as any[];

  return (
    <main className="min-h-screen bg-grayDark font-lexend">
      <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <NavBar isProfile={true} />

        {/* Profile card */}
        <div className="mt-[80px] flex justify-center">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <div className="flex justify-center">
              {profile?.profileImage ? (
                <Image
                  src={profile.profileImage}
                  alt={profile.username || "Profile"}
                  width={120}
                  height={120}
                  className="h-[120px] w-[120px] rounded-full border-4 border-white/15 object-cover"
                />
              ) : (
                <div className="grid h-[120px] w-[120px] place-items-center rounded-full border-4 border-white/15 bg-gradient-to-br from-burgundy-400 to-burgundy-800 text-3xl font-bold text-white">
                  {(profile?.username || "U").charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <h1 className="mt-4 text-2xl font-bold text-white">{profile?.username}</h1>
            {handle && <p className="text-sm text-white/60">@{handle}</p>}
            {profile?.bio && <p className="mt-2 text-sm text-white/80">{profile.bio}</p>}
            {joined && <p className="mt-4 text-xs text-white/50">Joined {joined}</p>}
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex justify-center gap-8 border-b border-white/10">
          {(["created", "saved"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 text-sm font-medium capitalize transition-colors ${
                tab === t
                  ? "text-white border-b-2 border-burgundy-500"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {t === "created" ? "Created styles" : "Saved styles"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="py-8">
          {tab === "created" ? (
            stylesLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] bg-black/20 rounded-[16px]" />
                  </div>
                ))}
              </div>
            ) : styles.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-white mb-2">No styles yet</h3>
                <p className="text-white/60 text-sm mb-6">
                  Share your first complete look with Mestyle.
                </p>
                <button
                  onClick={() => (window.location.href = "/creator")}
                  className="px-6 py-3 bg-burgundy-600 hover:bg-burgundy-700 text-white rounded-full text-sm transition-colors"
                >
                  Create a Style
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-max">
                {styles.map((style) => (
                  <StyleCard
                    key={style._id}
                    id={style._id}
                    description={style.title || style.description}
                    image={
                      !style.coverImage || style.coverImage.includes("example")
                        ? "/images/medium-shot-woman-with-yellow-suit-2.png"
                        : style.coverImage
                    }
                    ownerAvatar={style.owner?.profileImage}
                    ownerName={style.owner?.username || profile?.username}
                  />
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-white mb-2">Saved styles are coming soon</h3>
              <p className="text-white/60 text-sm">
                You&apos;ll be able to save looks you love and find them here.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
