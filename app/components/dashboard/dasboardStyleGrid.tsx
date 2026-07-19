import { useGetFeedQuery } from "@/app/redux/features/styleContent/styleApi";
import StyleCard from "../styleComp/styleCard";

interface Owner {
  avatar: string;
  name: string;
  username: string;
  profileImage: string;
}

interface StyleItem {
  _id: string;
  title?: string;
  description: string;
  imageUrl: string;
  posterIcon: string;
  posterName: string;
  coverImage: string;
  owner: Owner;
  occasions?: string[];
  categories?: string[];
  tags?: string[];
  colors?: string[];
  matchScore: number | null;
  matchReasons: string[];
}

interface FeedResponse {
  personalized: boolean;
  persona: { id: string; name: string } | null;
  items: StyleItem[];
}

/** True if the look matches a free-text query across its searchable fields. */
function matchesQuery(item: StyleItem, q: string): boolean {
  if (!q) return true;
  const haystack = [
    item.title,
    item.description,
    item.owner?.username,
    ...(item.occasions || []),
    ...(item.categories || []),
    ...(item.tags || []),
    ...(item.colors || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

function StyleGrid({ query = "" }: { query?: string }): JSX.Element {
  const { data, error, isLoading } = useGetFeedQuery({});

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-[3/4] bg-black/20 rounded-[12px] sm:rounded-[16px] mb-2 sm:mb-3"></div>
            <div className="h-3 bg-black/20 rounded w-3/4 mb-2"></div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black/20 rounded-full"></div>
              <div className="h-2 bg-black/20 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 sm:py-12">
        <p className="text-white/60 text-sm sm:text-base">
          Unable to load styles. Please try again later.
        </p>
      </div>
    );
  }

  const feed = (data || {}) as Partial<FeedResponse>;
  const allItems = feed.items ?? [];
  const q = query.trim();
  const items = q ? allItems.filter((it) => matchesQuery(it, q)) : allItems;

  return (
    <section className="px-2 sm:px-4">
      {/* Active-persona pill — "who we're styling for" */}
      {feed.personalized && feed.persona && !q && (
        <div className="mb-4 sm:mb-6 flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-black/30 border border-white/15 px-3 py-1.5">
            <span className="w-5 h-5 rounded-full bg-gradient-to-br from-burgundy-400 to-burgundy-800" />
            <span className="text-white/70 text-xs sm:text-sm">
              Styling for:{" "}
              <span className="text-white font-semibold">
                {feed.persona.name}
              </span>
            </span>
          </span>
        </div>
      )}

      {/* Search results count */}
      {q && (
        <p className="mb-4 sm:mb-6 text-sm text-white/60">
          {items.length} result{items.length === 1 ? "" : "s"} for{" "}
          <span className="text-white font-semibold">&ldquo;{q}&rdquo;</span>
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 auto-rows-max">
        {items.map(
          ({ _id, title, description, coverImage, owner, matchScore, matchReasons }) => (
            <StyleCard
              key={_id}
              id={_id}
              description={title || description}
              image={
                coverImage?.includes("example")
                  ? "/images/medium-shot-woman-with-yellow-suit-2.png"
                  : coverImage
              }
              ownerAvatar={owner?.profileImage}
              ownerName={owner?.username}
              matchScore={q ? undefined : matchScore}
              matchReasons={q ? [] : matchReasons}
            />
          ),
        )}
      </div>

      {/* Empty State — distinguishes "no results for search" vs "no styles yet" */}
      {items.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <div className="max-w-md mx-auto px-4">
            {q ? (
              <>
                <h3 className="text-lg sm:text-xl font-medium text-white mb-2">
                  No looks match &ldquo;{q}&rdquo;
                </h3>
                <p className="text-white/60 text-sm sm:text-base">
                  Try a different occasion, colour, or creator.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-lg sm:text-xl font-medium text-white mb-2">
                  No styles found
                </h3>
                <p className="text-white/60 text-sm sm:text-base mb-6">
                  Be the first to create and share your style inspiration!
                </p>
                <button
                  onClick={() => (window.location.href = "/creator")}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-burgundy-600 text-white rounded-[20px] hover:bg-burgundy-700 transition-colors text-sm sm:text-base"
                >
                  Create Your First Style
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default StyleGrid;
