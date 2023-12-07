import Image from "next/image";
import React from "react";
import Button from "../ui/button/template";
import imageLeft from "../../../public/images/hero/heroImage_left.png"

function Hero() {
  return (
    <section className="w-full h-screen p-8 space-y-3 bg-black text-white text-center">
      <div className="space-y-3 mt-4">
        <p className="md:text-5xl text-2xl font-lexend ">
          Get Your Confidence Again
        </p>
        <p className="md:text-2xl text-[10px]">
          Discover the latest trends and showcase your unique style
        </p>

        <Button variant="primary">Get Started</Button>
      </div>

      <div className="flex items-center justify-center">
        <Image
          src={imageLeft}
          alt="women style"
          width={400}
          height={500}
        />

        <Image
          src="/images/medium-shot-woman-with-yellow-suit-2.png"
          alt="fashion icon"
          width={270}
          height={270}
        />

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
