import Image from "next/image";
import React from "react";
import Button from "../ui/button/template";

function Explore() {
  const header = "Get Personalized Outfit Recommendations".split("");

  const paragraph =
    "Browse our curated collection of outfits and trends for every occasion. There&apos;s no need to create an account start exploring right away!".split(
      ""
    );

  return (
    <>
      <section className=" md:h-screen  p-20 md:p-24  bg-[url('/images/clothing-rack-with-floral-hawaiian-shirts-hangers-hat-1.png')] bg-no-repeat bg-cover">
        <div className=" lg:p-4 -ml-8 lg:ml-2 md:max-lg:py-8  flex space-y-8 flex-col justify-center">
          <div className="lg:w-[80%] w-full lg:pt-7 md:w-4/5 space-y-4 text-white">
            <p className="text-2xl md:text-4xl font-bold">
              {header.map((letter, index) => (
                <span key={index}>{letter}</span>
              ))}
            </p>
            <p className=" md:text-2xl">
              Browse our curated collection of outfits and trends for every
              occasion. There&apos;s no need to create an account start
              exploring right away!
            </p>
          </div>
          <div>
            <Button variant="primary">Start Exploring</Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Explore;
