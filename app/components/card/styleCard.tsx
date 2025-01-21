import Image from "next/image";

interface StyleCardProps {
  id: number;
  description: string;
  image: string;
  posterIcon: string;
  posterName: string;
}

function StyleCard({ id, description, image, posterIcon, posterName }: StyleCardProps): JSX.Element {
  return (
    <div className="w-[307px] h-[538px] flex-col items-start gap-5 inline-flex">
      <Image
        className="w-[307px] h-[435px] rounded-[20px]"
        src={image}
        width={307}
        height={538}
        alt="Style Image"
      />
      <div className="w-[287px] text-white text-xl font-medium">
        <h1 className="line-clamp-2">{description}</h1>
      </div>
      <div className="justify-start items-end gap-2.5 inline-flex">
        <Image
          className="w-[35px] h-[35px] rounded-full"
          src={posterIcon}
          width={35}
          height={35}
          alt={posterName}
        />
      </div>
    </div>
  );
}

export default StyleCard;
