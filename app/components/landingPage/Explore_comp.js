import Image from "next/image";
import React from "react";
import Button from "../ui/button/template";
import TextSpan from "@/app/composables/textSpan";

function Explore() {
  const header = "Get Personalized Outfit Recommendations".split("");

  const paragraph =
    "Browse our curated collection of outfits and trends for every occasion. There's no need to create an account start exploring right away!".split(
      ""
    );

  return (
    <>
      <section className="flex flex-col justify-center h-[580px] lg:h-[570px]  p-20 pl-10 md:pl-[55px] md:p-24  bg-[url('/images/clothing-rack-with-floral-hawaiian-shirts-hangers-hat-1.png')] bg-no-repeat bg-cover">
        <div className=" md:max-lg:py-8 lg:pl-[30px] space-y-8  ">
          <div className="lg:w-[80%] w-full lg:pt-7 md:w-4/5 space-y-4 text-white">
            <p className="text-2xl md:text-4xl font-bold">
              {header.map((letter, index) => (
                <span key={index}>{letter}</span>
              ))}
            </p>

            <p className=" md:text-2xl whitespace-">
              {paragraph.map((letter, index) => (
                <TextSpan key={index}>
                  {letter === " " ? "\u00A0" : letter}
                </TextSpan>
              ))}
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
