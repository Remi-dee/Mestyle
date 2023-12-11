"use client";

import Image from "next/image";
import imageLeft from "../../../../public/images/hero/heroImage_left.png";
import imageCenter from "../../../../public/images/hero/heroImage_center.png";
import imageRight from "../../../../public/images/hero/heroImage_right.png";
import polygon from "../../../../public/images/polygons/polygon3.png";
import Button from "../../ui/button/template";

import { useEffect, useRef, useState } from "react";
import { switchCenterImage } from "./utils/imageSwitchHelper.js";

function Hero_comp() {
  const polygonRef = useRef();
  let isScrolling = false;
  const [centerImageIndex, setCenterImageIndex] = useState(0);

  const imageCenter1 = "/images/hero/heroImage_center.png";
  const imageCenter2 = "/images/hero/heroImage_left.png";
  const imageCenter3 = "/images/hero/heroImage_right.png";

  const dynamicCenterImages = [
    imageCenter1,
    imageCenter2,
    imageCenter3,
    // Add more image paths as needed
  ];

  useEffect(() => {
    const handleScrollCallback = () => handleScroll(polygonRef);

    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        requestIdleCallback(() => {
          const scrollY = window.scrollY;
          const parentBottom =
            polygonRef.current.parentElement.getBoundingClientRect().bottom;

          if (scrollY > parentBottom) {
            polygonRef.current.classList.add("hidden");
          } else {
            polygonRef.current.classList.remove("hidden");
          }

          isScrolling = false;
        });
      }
    };

    const switchCenterImageCallback = () =>
      switchCenterImage(
        centerImageIndex,
        setCenterImageIndex,
        dynamicCenterImages
      );

    const imageSwitchTimer = setInterval(switchCenterImageCallback, 2000);

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(imageSwitchTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dynamicCenterImages]);

  return (
    <div className="text-center pb-[50px] bg-grayDark relative font-lexend">
      <div className="py-3">
        <span className="text-white text-3xl md:text-5xl font-normal ">
          Get Your
        </span>
        <span className="text-white text-3xl md:text-5xl font-semibold mx-3 ">
          Confidence
        </span>
        <span className="text-white text-3xl md:text-5xl font-normal ">
          Again
        </span>
        <div className="text-white text-[16px] md:text-2xl font-normal leading-[30px] my-2">
          Discover the latest trends and showcase your unique style
        </div>
        <Button type="button" onClick={"#"} className="mt-4 ">
          Get Started
        </Button>
      </div>

      <div className="flex justify-center ">
        <div className="-ml-[180px] md:-ml-0">
          <Image
            width={null}
            height={500}
            src={imageLeft}
            alt=""
            className="w-[700px] md:w-[400px] rounded-tl-[20px] rounded-tr-[20px]"
          />
        </div>

        <div className=" mt-10 md:mt-8 rounded-tl-[20px] rounded-tr-[20px] ">
          <Image
            width={500}
            height={500}
            src={dynamicCenterImages[centerImageIndex]}
            alt=""
            className="w-[500px] md:w-[300px]"
          />
        </div>

        <div className="  -mr-[180px] md:-mr-0">
          <Image
            width={null}
            height={500}
            src={imageRight}
            alt=""
            className="w-[700px] md:w-[400px] rounded-tl-[20px] rounded-tr-[20px]"
          />
        </div>
      </div>

      <div className=" flex items-center justify-center  ">
        <Image
          ref={polygonRef}
          width={null}
          height={214}
          src={polygon}
          alt=""
          className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[260px] md:w-[300px]"
        />
      </div>
    </div>
  );
}

export default Hero_comp;
