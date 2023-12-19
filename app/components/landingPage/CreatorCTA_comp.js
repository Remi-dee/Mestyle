import Image from "next/image";
import React from "react";
import Button from "../ui/button/template";
import stackLeft from "@/public/images/creator/creatorStack_left.png";
import stackRight from "@/public/images/creator/creatorStack_right.png";
import stackCenter from "@/public/images/creator/creatorStack_center.png";
import waterMark from "@/public/images/creator/waterMark.png";

function CreatorCTA() {
  return (
    <>
      <section className="relative lg:flex gap-2 bg-black w-full h-screen space-y-4 lg:px-24 lg:pt-24 lg:pb-0 px-6 pt-6 pb-6">
        <div className="  ">
          <Image
            width={200}
            height={null}
            src={stackLeft}
            alt=""
            className="absolute top-20 left-25  h-[300px] w-[200px] rounded-tl-[20px] rounded-tr-[20px]  "
          />

          <Image
            width={200}
            height={null}
            src={stackRight}
            alt=""
            className="absolute top-40 left-[200px] z-30 h-[300px]  rounded-tl-[20px] rounded-tr-[20px]"
          />

          <Image
            width={200}
            height={null}
            src={stackCenter}
            alt=""
            className="absolute top-80 left-30 h-[300px] rounded-tl-[20px] rounded-tr-[20px]"
          />
        </div>

        <div>
          <Image
            width={200}
            height={null}
            src={waterMark}
            alt=""
            className="rounded-tl-[20px] rounded-tr-[20px]"
          />
        </div>

        <div className="lg:w-6/12 w-10/12 flex justify-center items-center  mx-auto">
          <div className=" space-y-8 text-white">
            <p className="text-2xl lg:text-4xl font-bold">
              Discover the Creator in You
            </p>
            <p className="text-xs lg:text-2xl">
              Calling all fashion enthusiasts, trendsetters, and style mavens!
              At Mestyle, we believe that everyone has the potential to be a
              fashion creator and inspire others with their unique style. Join
              our fashion community today and embark on a journey of
              self-expression and creativity
            </p>
            <Button variant="inverted"> Get Started As a Creator</Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default CreatorCTA;
