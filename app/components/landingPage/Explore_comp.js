"use client";

function Explore() {
  return (
    <div className="bg-explore-bg">
      <div className="w-[691px] h-[275px] flex-col justify-start items-start gap-6 inline-flex">
        <div className="w-[691px] text-white text-[47px] font-bold font-['Lexend']">
          Get Personalized Outfit Recommendations
        </div>
        <div className="w-[547px] text-white text-2xl font-normal font-['Lexend'] leading-[30px]">
          Browse our curated collection of outfits and trends for every
          occasion. There's no need to create an account start exploring right
          away!
        </div>
        <div className="h-12 px-4 bg-white justify-center items-center gap-2 inline-flex">
          <div className="text-center text-black text-base font-medium font-['Inter'] leading-tight">
            Start Exploring
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
