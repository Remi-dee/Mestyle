import Image from "next/image";
import React from "react";

function About() {
  return (
    <>
      <section className="w-full lg:h-screen lg:p-24 p-6 bg-[url('/images/clothing-rack-with-floral-hawaiian-shirts-hangers-hat-1.png')] bg-no-repeat bg-cover">
        <div className="h-full w-full p-4 flex items-center">
          <div className="lg:w-2/5 w-4/5 space-y-4 text-white">
            <p className="text-2xl lg:text-4xl font-bold">
              Get Personalized Outfit Recommendations
            </p>
            <p className="text-xs lg:text-2xl">
              Browse our curated collection of outfits and trends for every
              occasion. There&apos;s no need to create an account start
              exploring right away!
            </p>
            <button
              className="p-2 lg:p-3 text-xs lg:text-base bg-white text-black font-medium"
              type="button"
            >
              Start Exploring
            </button>
          </div>
        </div>
      </section>

      <section className="lg:flex gap-2 bg-black w-full h-screen lg:p-24 p-6">
        <div className="w-6/12  mx-auto">
          <Image src="/images/photobuck.png" alt="Creators" width={400} height={400} />
        </div>
        <div className="lg:w-6/12 w-10/12 flex justify-center items-center  mx-auto">
          <div className=" space-y-4 text-white">
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
            <button
              className="p-2 lg:p-3 text-xs lg:text-base bg-black text-white font-medium border"
              type="button"
            >
              Get Started As a Creator
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
