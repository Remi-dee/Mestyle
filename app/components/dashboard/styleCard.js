import Image from "next/image";
import styleImage from "@/public/images/portrait-cool-man-with-sunglasses-dancing.png";
import posterIcon from "@/public/images/medium-shot-woman-with-yellow-suit-2.png";
function StyleCard() {
  return (
    <>
      <div className="w-[307px] h-[538px] flex-col items-start gap-2.5 inline-flex">
        <Image
          className="w-[307px] h-[435px] rounded-[20px]"
          src={styleImage}
          width={null}
          height={null}
          placeholder="blur"
          alt="Style Image"
        />
        <div className="w-[287px] text-white text-xl  font-medium ">
          <h1 className="line-clamp-2">
            Man on brown hat with oversized jacket street style, Man on brown
            hat with oversized jacket street style, Man on brown hat with
            oversized jacket street style, Man on brown hat with oversized
            jacket street styl
          </h1>
        </div>
        <div className="justify-start items-end gap-2.5 inline-flex">
          <Image
            className="w-[35px] h-[35px] rounded-full"
            src={posterIcon}
            width={null}
            height={null}
            placeholder="blur"
            alt="Poster Profile"
          />
          <div className="w-[147px] h-8 text-neutral-400 text-lg font-semibold ">
            FashionMaker
          </div>
        </div>
      </div>
    </>
  );
}

export default StyleCard;
