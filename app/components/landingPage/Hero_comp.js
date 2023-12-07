"use client";

import Image from "next/image";
import imageLeft from "../../../public/images/hero/heroImage_left.png";
import imageCenter from "../../../public/images/hero/heroImage_center.png";
import imageRight from "../../../public/images/hero/heroImage_right.png";
import polygon from "../../../public/images/polygons/polygon3.png";
import Button from "../ui/button/template";

function Hero_comp() {
  return (
    <div className="text-center pb-10 bg-grayDark h-screen">
      <div className="py-3">
        <span className="text-white text-3xl md:text-5xl font-normal ">Get Your</span>
        <span className="text-white text-3xl md:text-5xl font-semibold mx-3 ">
          Confidence
        </span>
        <span className="text-white text-3xl md:text-5xl font-normal ">Again</span>
        <div className="text-white text-[16px] md:text-2xl font-normal leading-[30px] my-2">
          Discover the latest trends and showcase your unique style
        </div>
        <Button type="button" onClick={"#"} className="mt-4 ">
          Get Started
        </Button>
      </div>

      <div className="flex justify-center ">
        <div className="-ml-10 md:-ml-0">
          <Image
            width={null}
            height={500}
            src={imageLeft}
            alt=""
            className="w-[700px] md:w-[400px] rounded-tl-[20px] rounded-tr-[20px]"
          />
        </div>

        <div className=" mt-7 rounded-tl-[20px] rounded-tr-[20px] ">
          <Image width={null} src={imageCenter} alt=""  className="w-[500px] md:w-[300px]"/>
        </div>

        <div className="  -mr-10 md:-mr-0">
          <Image
            width={null}
            height={500}
            src={imageRight}
            alt=""
            className="w-[700px] md:w-[400px] rounded-tl-[20px] rounded-tr-[20px]"
          />
        </div>
      </div>

      <div className=" flex justify-center mt-[-100px] w-[150px] md:w-[300px]  ">
        <Image width={null} height={214} src={polygon} alt="" />
      </div>
    </div>
  );
}

export default Hero_comp;
