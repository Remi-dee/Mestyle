"use client";

import Image from "next/image";
import Button from "../ui/button/template";
import stackLeft from "../../../public/images/creator/creatorStack_left";
import stackRight from "../../../public/images/creator/creatorStack_right";
import stackCenter from "../../../public/images/creator/creatorStack_center";

function Creator() {
  return (
    <div className="w-[1440px] h-[719px] bg-grayDark">
      <div className="w-[473px] h-[785px]">
        <Image
          width={270}
          height={344}
          src={stackLeft}
          alt=""
          className="rounded-tl-[20px] rounded-tr-[20px]"
        />

        <Image
          width={270}
          height={344}
          src={stackRight}
          alt=""
          className="rounded-tl-[20px] rounded-tr-[20px]"
        />

        <Image
          width={270}
          height={344}
          src={stackCenter}
          alt=""
          className="rounded-tl-[20px] rounded-tr-[20px]"
        />

        <img
          className="w-[270px] h-[344.25px] rounded-tl-[20px] rounded-tr-[20px]"
          src="https://via.placeholder.com/270x344"
        />
        <img
          className="w-[270px] h-[399.97px]  rounded-tl-[20px] rounded-tr-[20px]"
          src="https://via.placeholder.com/270x400"
        />
        <div className="w-[416px] h-[267.90px] left-[40px] top-[134px] absolute"></div>
        <img
          className="w-[270px] h-[442px] rounded-tl-[20px] rounded-tr-[20px]"
          src="https://via.placeholder.com/270x442"
        />
      </div>

      <div className="">
        <div className="w-[691px] text-white text-[47px] font-semibold">
          Discover the Creator in You
        </div>
        <div className="w-[547px] text-white text-2xl font-normal font-['Lexend'] leading-[30px]">
          Calling all fashion enthusiasts, trendsetters, and style mavens! At
          Mestyle, we believe that everyone has the potential to be a fashion
          creator and inspire others with their unique style. Join our fashion
          community today and embark on a journey of self-expression and
          creativity
        </div>
        <div className="h-12 px-4 border border-neutral-700 justify-center items-center gap-2 inline-flex">
          <div className="text-center text-white text-base font-medium font-['Inter'] leading-tight">
            Get Started As a Creator
          </div>
        </div>
      </div>
    </div>
  );
}

export default Creator;
