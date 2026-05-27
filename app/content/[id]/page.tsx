"use client";

import { useParams, useRouter } from "next/navigation";
import StyleDetailCard from "../../components/styleComp/styleDetailed";
import { useGetStyleByIdQuery } from "../../redux/features/styleContent/styleApi";

export default function StyleDetailedPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: style, isLoading, error } = useGetStyleByIdQuery(id as string);
  console.log("here is style", style);
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
  if (error) return <div>Error loading style details.</div>;
  if (!style) return <div>No style found.</div>;

  return <StyleDetailCard {...style} />;
}
