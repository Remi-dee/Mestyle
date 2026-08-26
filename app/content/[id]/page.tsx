"use client";

import { useParams, useRouter } from "next/navigation";
import StyleDetailCard from "../../components/styleComp/styleDetailed";
import { useGetStyleByIdQuery } from "../../redux/features/styleContent/styleApi";

export default function StyleDetailedPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: style, isLoading, error } = useGetStyleByIdQuery(id as string);
  if (isLoading)
    return (
      <div className="min-h-screen bg-grayDark flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-burgundy-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white/80 font-lexend">
            Loading style details...
          </p>
        </div>
      </div>
    );
  if (error || !style)
    return (
      <div className="min-h-screen bg-grayDark flex items-center justify-center px-4 font-lexend">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 max-w-md text-center">
          <h3 className="text-white text-lg font-semibold mb-2">
            {error ? "Couldn't load this look" : "Look not found"}
          </h3>
          <p className="text-white/60 text-sm mb-5">
            It may have been removed. Try heading back to explore.
          </p>
          <button
            onClick={() => router.push("/explore")}
            className="px-5 py-2.5 bg-burgundy-600 hover:bg-burgundy-700 text-white rounded-full text-sm transition-colors"
          >
            Back to Explore
          </button>
        </div>
      </div>
    );

  return <StyleDetailCard {...style} />;
}
