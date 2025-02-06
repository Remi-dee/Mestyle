"use client";

import { useParams, useRouter } from "next/navigation";
import StyleDetailCard from "../../components/styleComp/styleDetailed";
import { useGetStyleByIdQuery } from "../../redux/features/styleContent/styleApi";

export default function StyleDetailedPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: style, isLoading, error } = useGetStyleByIdQuery(id as string);
  console.log("here is style", style);
  if (isLoading) return <div>Loading style details...</div>;
  if (error) return <div>Error loading style details.</div>;
  if (!style) return <div>No style found.</div>;

  return <StyleDetailCard {...style} />;
}
