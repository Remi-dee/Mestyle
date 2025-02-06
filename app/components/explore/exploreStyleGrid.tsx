import { useGetRandomStylesQuery } from "@/app/redux/features/styleContent/styleApi";
import StyleCard from "../styleComp/styleCard";

const staticItems = [
  {
    id: 1,
    styleImage: "/images/medium-shot-woman-with-yellow-suit-2.png",
    description:
      "Man on brown hat with oversized jacket street style, Man on brown hat with oversized jacket street style",
    posterIcon: "/images/medium-shot-woman-with-yellow-suit-2.png",
    posterName: "FashionMaker1",
  },
  // Additional items here
];

function StyleGrid(): JSX.Element {
  const { data, error, isLoading } = useGetRandomStylesQuery({});

  if (isLoading) {
    return <div>Loading styles...</div>;
  }

  if (error) {
    return <div>Error fetching styles: {error.toString()}</div>;
  }
  const items = data || []; // Assuming the API response has a `styles` array
  console.log(items);
  return (
    <section>
      <div className="relative grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-4 gap-x-[30px] gap-y-[80px]">
        {items.map(({ _id, description, imageUrl, posterIcon, posterName }) => (
          <StyleCard
            key={_id}
            id={_id}
            description={description}
            image={
              imageUrl.includes("example")
                ? "/images/medium-shot-woman-with-yellow-suit-2.png"
                : imageUrl
            }
            posterIcon={posterIcon}
            posterName={posterName}
          />
        ))}
      </div>
    </section>
  );
}

export default StyleGrid;
