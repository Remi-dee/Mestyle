"use client";

import Image from "next/image";
import imageLeft from "../../../public/images/hero/heroImage_left.png";
import imageCenter from "../../../public/images/hero/heroImage_center.png";
import imageRight from "../../../public/images/hero/heroImage_right.png";
import polygon from "../../../public/images/polygons/polygon3.png";
import Button from "../ui/button/template";

function Hero() {
  return (
    <div className="text-center mb-10 bg-grayDark">
      <div className="my-4">
        <span className="text-white text-5xl font-normal ">Get Your</span>
        <span className="text-white text-5xl font-semibold mx-3 ">
          Confidence
        </span>
        <span className="text-white text-5xl font-normal ">Again</span>
        <div className="text-white text-2xl font-normal leading-[30px] my-2">
          Discover the latest trends and showcase your unique style
        </div>
        <Button type="button" onClick={"#"} className="mt-4">
          Get Started
        </Button>
      </div>

      <div className="flex">
        <div>
          <Image
            width={452}
            height={700}
            src={imageLeft}
            alt=""
            className="rounded-tl-[20px] rounded-tr-[20px]"
          />
        </div>

        <div className="mt-7 rounded-tl-[20px] rounded-tr-[20px]">
          <Image width={350} src={imageCenter} alt="" />
        </div>

        <div>
          <Image
            width={452}
            height={551}
            src={imageRight}
            alt=""
            className="rounded-tl-[20px] rounded-tr-[20px]"
          />
        </div>
      </div>

      <div className=" flex justify-center mt-[-150px] ">
        <Image width={350} height={214} src={polygon} alt="" />
      </div>
    </div>
  );
}

export default Hero;
