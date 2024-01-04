import StyleCard from "./styleCard";

function StyleGrid() {
  const items = [
    {
      id: 1, // Add a unique identifier for each item
      styleImage: "/images/medium-shot-woman-with-yellow-suit-2.png",
      description:
        "Man on brown hat with oversized jacket street style, Man on brown hat with oversized jacket street style, Man on brown hat with oversized jacket street style, Man on brown hat with oversized jacket street styl",
      posterIcon: "/images/medium-shot-woman-with-yellow-suit-2.png",
      posterName: "FashionMaker1",
    },
    {
      id: 2,
      styleImage: "/images/hero/heroImage_center.png",
      description:
        "Another description for the second item. Adjust as needed for your content.",
      posterIcon: "/images/medium-shot-woman-with-yellow-suit-2.png",
      posterName: "FashionMaker2",
    },

    {
      id: 3,
      styleImage: "/images/conversation-nationality-work-male-business-classy.png",
      description:
        "Another description for the second item. Adjust as needed for your content.",
      posterIcon: "/images/medium-shot-woman-with-yellow-suit-2.png",
      posterName: "FashionMaker2",
    },

    {
      id: 4,
      styleImage: "/images/hero/heroImage_right.png",
      description:
        "Another description for the second item. Adjust as needed for your content.",
      posterIcon: "/images/medium-shot-woman-with-yellow-suit-2.png",
      posterName: "FashionMaker2",
    },

    {
      id: 5,
      styleImage: "/images/conversation-nationality-work-male-business-classy.png",
      description:
        "Another description for the second item. Adjust as needed for your content.",
      posterIcon: "/images/medium-shot-woman-with-yellow-suit-2.png",
      posterName: "FashionMaker2",
    },

    {
      id: 6,
      styleImage: "/images/hero/heroImage_center.png",
      description:
        "Another description for the second item. Adjust as needed for your content.",
      posterIcon: "/images/medium-shot-woman-with-yellow-suit-2.png",
      posterName: "FashionMaker2",
    },

    {
      id: 7,
      styleImage: "/images/hero/heroImage_left.png",
      description:
        "Another description for the second item. Adjust as needed for your content.",
      posterIcon: "/images/medium-shot-woman-with-yellow-suit-2.png",
      posterName: "FashionMaker2",
    },

    {
      id: 8,
      styleImage: "/images/hero/heroImage_right.png",
      description:
        "Another description for the second item. Adjust as needed for your content.",
      posterIcon: "/images/medium-shot-woman-with-yellow-suit-2.png",
      posterName: "FashionMaker2",
    },

    {
      id: 9,
      styleImage: "/images/hero/heroImage_center.png",
      description:
        "Another description for the second item. Adjust as needed for your content.",
      posterIcon: "/images/medium-shot-woman-with-yellow-suit-2.png",
      posterName: "FashionMaker2",
    },

    {
      id: 10,
      styleImage: "/images/hero/heroImage_left.png",
      description:
        "Another description for the second item. Adjust as needed for your content.",
      posterIcon: "/images/medium-shot-woman-with-yellow-suit-2.png",
      posterName: "FashionMaker2",
    },
    // Add more items as needed
  ];

  return (
    <div className="max-w-[1245px] grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-4 gap-[80px] ">
      {items.map(({ id, description, styleImage, posterIcon, posterName }) => {
        return (
          <StyleCard
            key={id}
            id={id}
            description={description}
            image={styleImage}
            posterIcon={posterIcon}
            posterName={posterName}
          />
        );
      })}
    </div>
  );
}

export default StyleGrid;
