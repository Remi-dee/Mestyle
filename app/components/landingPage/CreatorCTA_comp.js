import Image from "next/image";
import React from "react";
import Button from "../ui/button/template";

function CreatorCTA() {
  return (
    <>
      <section className="lg:flex gap-2 bg-black w-full h-screen space-y-4 lg:px-24 lg:pt-24 lg:pb-0 px-6 pt-6 pb-6">
        <div className="mx-auto overflow-hidden">
          <Image
            src="/images/photobuck.png"
            alt="Creators"
            width={500}
            height={500}
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
