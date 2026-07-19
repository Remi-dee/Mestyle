import { useGetRandomStylesQuery } from "@/app/redux/features/styleContent/styleApi";
import StyleCard from "../styleComp/styleCard";
import { matchesStyleQuery } from "../search/StyleSearch";

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

function StyleGrid({ query = "" }: { query?: string }): JSX.Element {
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

  const allItems = (data || []) as StyleItem[];
  const q = query.trim();
  const items = q ? allItems.filter((it) => matchesStyleQuery(it as any, q)) : allItems;

  if (allItems.length === 0) {
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
      {q && (
        <p className="mb-5 text-sm text-white/60">
          {items.length} result{items.length === 1 ? "" : "s"} for{" "}
          <span className="text-white font-semibold">&ldquo;{q}&rdquo;</span>
        </p>
      )}

      {items.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg sm:text-xl font-medium text-white mb-2">
            No looks match &ldquo;{q}&rdquo;
          </h3>
          <p className="text-white/60 text-sm sm:text-base">
            Try a different occasion, colour, or creator.
          </p>
        </div>
      ) : (
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
      )}
    </section>
  );
}

export default StyleGrid;
