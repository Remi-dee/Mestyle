import Image from "next/image";
import React from "react";
import { register } from "swiper/element/bundle";

register();

function Hero() {
  return (
    <section className="w-full h-screen p-8 space-y-3 bg-black text-white text-center">
      <div className="space-y-3 mt-8">
        <p className="md:text-5xl text-2xl font-lexend ">
          Get Your Confidence Again
        </p>
        <p className="md:text-2xl text-[10px]">
          Discover the latest trends and showcase your unique style
        </p>

        <button className="p-3 bg-white text-black" type="button">
          Get Started
        </button>
      </div>

      <div className="flex">
        <Image
          src="/images/attractive-afroamerican-models-posing-outdoors-4.png"
          alt="women style"
          width={300}
          height={300}
        />
        {/* <swiper-container
            ref={swiperElRef}
          slides-per-view="1"
          navigation="false"
          pagination="false"
        >
          <swiper-slide>
            <Image
              src="/images/charming-man-posing-with-copy-space-1.png"
              alt="fashion icon"
              width={400}
              height={400}
            />
          </swiper-slide>
          <swiper-slide>
            <Image
              src="/images/medium-shot-woman-posing-park-1.png"
              alt="fashion icon"
              width={400}
              height={400}
            />
          </swiper-slide>
          <swiper-slide>
            <Image
              src="/images/conversation-nationality-work-male-business-classy.png"
              alt="fashion icon"
              width={400}
              height={400}
            />
          </swiper-slide>
          <swiper-slide>
            <Image
              src="/images/medium-shot-woman-with-yellow-suit-2.png"
              alt="fashion icon"
              width={400}
              height={400}
            />
          </swiper-slide>
          <swiper-slide>
            <Image
              src="/images/confident-woman-being-body-positive.png"
              alt="fashion icon"
              width={400}
              height={400}
            />
          </swiper-slide>

          <swiper-slide>
            <Image
              src="/images/medium-shot-woman-with-yellow-suit-2.png"
              alt="fashion icon"
              width={400}
              height={400}
            />
          </swiper-slide>
          <swiper-slide>
            <Image
              src="/images/portrait-cool-man-with-sunglasses-dancing.png"
              alt="fashion icon"
              width={400}
              height={400}
            />
          </swiper-slide>
        </swiper-container>*/}
        <div>
          <Image
            src="/images/attractive-afroamerican-models-posing-outdoors-5.png"
            alt="women style"
            width={300}
            height={300}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
