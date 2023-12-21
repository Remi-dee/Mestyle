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
      <section className="relative lg:flex  gap-[600px]   w-full h-[650px] md:h-[560px] lg:h-[700px] space-y-4 ">
        <div className="  ">
          <div className=" ">
            <Image
              width={null}
              height={null}
              src={stackLeft}
              alt=""
              className="absolute w-[150px] h-[200px] md:h-[240px] md:w-[170px] lg:w-[200px] top-[50px] md:top-[55px] md:max-lg:left-[88px] left-[130px]  lg:h-[300px]  rounded-tl-[20px] rounded-tr-[20px]  "
            />

            <Image
              width={200}
              height={null}
              l
              src={stackRight}
              alt=""
              className="absolute  lg:w-[200px] w-[150px] h-[200px] md:h-[240px] md:w-[170px] top-[141px] left-[230px] md:left-[200px] lg:left-[270px] md:top-[166px] lg:h-[300px]  rounded-tl-[20px] rounded-tr-[20px]"
            />

            <Image
              width={200}
              height={null}
              src={stackCenter}
              alt=""
              className="absolute w-[150px] h-[200px] md:h-[240px] md:w-[170px] lg:w-[200px] top-[245px] md:top-[270px] lg:top-[347px] left-[100px]  md:left-[58px] lg:left-[93px] lg:h-[300px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[20px]"
            />
          </div>
        </div>
        <div className="absolute w-[150px] md:w-[200px] top-[152px] md:top-[155px] md:left-[100px] z-30 lg:top-[230px] lg:left-[150px] left-[140px]">
          <Image
            width={null}
            height={null}
            src={waterMark}
            alt=""
            className=""
          />
        </div>
        <div className="absolute bottom-[4px] left-10 md:top-0 md:left-[240px] lg:left-[45%] lg:w-6/12 w-10/12 flex justify-center  items-center  ">
          <div className=" space-y-8 text-white">
            <p className="text-2xl lg:text-4xl font-bold">
              Discover the Creator in You
            </p>
            <p className="text-xs lg:text-2xl md:max-lg:w-[350px]">
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
