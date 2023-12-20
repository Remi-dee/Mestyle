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
      <section className="relative lg:flex  gap-[600px]   w-full h-screen space-y-4 ">
        <div className="  ">
          <div className=" ">
            <Image
              width={200}
              height={null}
              src={stackLeft}
              alt=""
              className="absolute top-20 left-[130px]  h-[300px] w-[200px] rounded-tl-[20px] rounded-tr-[20px]  "
            />

            <Image
              width={200}
              height={null}
              src={stackRight}
              alt=""
              className="absolute top-[166px] left-[250px]  h-[300px]  rounded-tl-[20px] rounded-tr-[20px]"
            />

            <Image
              width={200}
              height={null}
              src={stackCenter}
              alt=""
              className="absolute top-[370px] left-[100px] h-[300px] rounded-tl-[20px] rounded-tr-[20px]"
            />
          </div>
        </div>
        <div className="absolute top-[180px]  left-[135px]">
          <Image
            width={310}
            height={null}
            src={waterMark}
            alt=""
            className=""
          />
        </div>
        <div className="absolute  bottom-0 left-10 md:top-0 md:left-[45%] lg:w-6/12 w-10/12 flex justify-center items-center  mx-auto">
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
