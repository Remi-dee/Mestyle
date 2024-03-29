"use client";
import Image from "next/image";
import imageLeft from "../../../../public/images/hero/heroImage_left.png";

import imageRight from "../../../../public/images/hero/heroImage_right.png";
import polygon from "../../../../public/images/polygons/polygon3.png";
import Button from "../../ui/button/button";
import { motion } from "framer-motion";

import { useEffect, useRef, useState } from "react";
import {
  dynamicCenterImages,
  switchCenterImage,
} from "./utils/imageSwitchHelper.js";
import { heroMotion, variants } from "./utils/motion";
import { useRouter } from "next/navigation";
import Authentication from "../../authentication/authentication";

function Hero_comp() {
  const router = useRouter();
  const polygonRef = useRef();

  let isScrolling = false;
  const [centerImageIndex, setCenterImageIndex] = useState(0);

  useEffect(() => {
    // const handleScroll = () => {
    //   if (!isScrolling) {
    //     isScrolling = true;
    //     requestIdleCallback(() => {
    //       const scrollY = window.scrollY;
    //       const parentBottom =
    //         polygonRef.current.parentElement.getBoundingClientRect().bottom;

    //       if (scrollY > parentBottom) {
    //         polygonRef.current.classList.add("hidden");
    //       } else {
    //         polygonRef.current.classList.remove("hidden");
    //       }

    //       isScrolling = false;
    //     });
    //   }
    // };

    const switchCenterImageCallback = () =>
      switchCenterImage(centerImageIndex, setCenterImageIndex);

    const imageSwitchTimer = setInterval(switchCenterImageCallback, 4000);

    // window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(imageSwitchTimer);
      // window.removeEventListener("scroll", handleScroll);
    };
  }, [dynamicCenterImages]);

  return (
    <div className="text-center pb-[50px] bg-grayDark relative font-lexend">
      <motion.div
        variants={variants.element}
        initial={false}
        animate="show"
        transition={{ delay: 0.5 }} // Adjust the delay as needed
        className="py-3"
      >
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
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            router.push("/?view=signup");
          }}
          className="mt-4 "
        >
          Get Started
        </Button>{" "}
      </motion.div>

      <motion.div
        variants={variants}
        initial="hidden"
        animate="show"
        className="flex justify-center "
      >
        <motion.div
          variants={heroMotion[0].leftImage}
          className="-ml-[180px] md:-ml-0"
        >
          <Image
            width={null}
            height={null}
            src={imageLeft}
            alt=""
            className="w-[700px] md:w-[400px] rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px]"
          />
        </motion.div>

        <motion.div
          key={centerImageIndex}
          variants={heroMotion[1].centerImage}
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
          variants={heroMotion[2].rightImage}
          className="  -mr-[180px] md:-mr-0"
        >
          <Image
            width={null}
            height={null}
            src={imageRight}
            alt=""
            className="w-[700px] md:w-[400px] rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: [0, 1],
          transition: { repeat: Infinity, duration: 4 },
        }}
        className="flex items-center justify-center"
      >
        <Image
          // ref={polygonRef}
          width={null}
          height={214}
          src={polygon}
          alt=""
          className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[260px] md:w-[300px]"
        />
      </motion.div>
      
    </div>
  );
}

export default Hero_comp;
