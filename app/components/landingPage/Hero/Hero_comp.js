"use client";

import Image from "next/image";
import imageLeft from "../../../../public/images/hero/heroImage_left.png";

import imageRight from "../../../../public/images/hero/heroImage_right.png";
import polygon from "../../../../public/images/polygons/polygon3.png";
import Button from "../../ui/button/template";
import { motion } from "framer-motion";

import { useEffect, useRef, useState } from "react";
import {
  dynamicCenterImages,
  switchCenterImage,
} from "./utils/imageSwitchHelper.js";

function Hero_comp() {
  const polygonRef = useRef();
  let isScrolling = false;
  const [centerImageIndex, setCenterImageIndex] = useState(0);

  const variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.9 } },
  };

  const heroImages = [
    {
      leftImage: {
        hidden: {
          opacity: 0,
          x: 0,
        },
        show: {
          opacity: 1,
          x: 0,
          transitions: {
            duration: 1,
          },
        },
      },
    },
    {
      centerImage: {
        hidden: {
          opacity: 0,
          y: 30,
        },
        show: {
          opacity: 1,
          y: 0,
          transitions: {
            duration: 2,
          },
        },
      },
    },

    {
      rightImage: {
        hidden: {
          opacity: 0,
          x: 0,
        },
        show: {
          opacity: 1,
          x: 0,
          transitions: {
            duration: 2,
          },
        },
      },
    },
  ];

  useEffect(() => {
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
      switchCenterImage(centerImageIndex, setCenterImageIndex);

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

      <motion.div
        variants={variants}
        initial="hidden"
        animate="show"
        className="flex justify-center "
      >
        <motion.div
          variants={heroImages[0].leftImage}
          className="-ml-[180px] md:-ml-0"
        >
          <Image
            width={null}
            height={500}
            src={imageLeft}
            alt=""
            className="w-[700px] md:w-[400px] rounded-tl-[20px] rounded-tr-[20px]"
          />
        </motion.div>

        <motion.div
          variants={heroImages[1].centerImage}
          className=" mt-10 md:mt-8 rounded-tl-[20px] rounded-tr-[20px] "
        >
          <Image
            width={500}
            height={500}
            src={dynamicCenterImages[centerImageIndex]}
            alt=""
            className="w-[500px] md:w-[300px]"
          />
        </motion.div>

        <motion.div
          variants={heroImages[2].rightImage}
          className="  -mr-[180px] md:-mr-0"
        >
          <Image
            width={500}
            height={500}
            src={dynamicCenterImages[centerImageIndex]}
            alt=""
            className="w-[700px] md:w-[400px] rounded-tl-[20px] rounded-tr-[20px]"
          />
        </motion.div>
      </motion.div>

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
