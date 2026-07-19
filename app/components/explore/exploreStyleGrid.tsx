import { useGetRandomStylesQuery } from "@/app/redux/features/styleContent/styleApi";
import StyleCard from "../styleComp/styleCard";

interface Owner {
  username: string;
  profileImage: string;
}

interface StyleItem {
  _id: string;
  title?: string;
  description: string;
  coverImage: string;
  owner: Owner;
}

function StyleGrid(): JSX.Element {
  const { data, error, isLoading } = useGetRandomStylesQuery({});

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-[3/4] bg-black/20 rounded-[12px] sm:rounded-[16px] mb-2 sm:mb-3" />
            <div className="h-3 bg-black/20 rounded w-3/4 mb-2" />
            <div className="h-2 bg-black/20 rounded w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60 text-sm sm:text-base">
          Unable to load styles. Please try again later.
        </p>
      </div>
    );
  }

  const items = (data || []) as StyleItem[];

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60 text-sm sm:text-base">
          No styles to explore yet — check back soon.
        </p>
      </div>
    );
  }

  return (
    <section className="px-4 sm:px-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-max">
        {items.map(({ _id, title, description, coverImage, owner }) => (
          <StyleCard
            key={_id}
            id={_id}
            description={title || description}
            image={
              !coverImage || coverImage.includes("example")
                ? "/images/medium-shot-woman-with-yellow-suit-2.png"
                : coverImage
            }
            ownerAvatar={owner?.profileImage}
            ownerName={owner?.username}
          />
        ))}
      </div>
    </section>
  );
}

export default StyleGrid;
