"use client";

import Button from "../ui/button/template";

function Explore() {
  return (
    <div className="flex justify-center items-center bg-cover bg-explore-bg ">
      <div className="w-[691px] h-[275px]">
        <div className=" text-white text-[47px] font-bold">
          Get Personalized Outfit Recommendations
        </div>
        <div className="w-[547px] text-white text-2xl font-normal font-['Lexend'] leading-[30px]">
          Browse our curated collection of outfits and trends for every
          occasion. There's no need to create an account start exploring right
          away!
        </div>
       
          <Button type="" className="text-center text-black text-base font-medium font-['Inter'] leading-tight">
            Start Exploring
          </Button>
        
      </div>
    </div>
  );
}

export default Explore;
