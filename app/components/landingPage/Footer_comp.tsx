import React from "react";
import { oregano } from "../../localFonts/oregano/oregano";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#D9D9D9] lg:px-24 py-2 px-4 w-full flex justify-between items-center">
      <p style={oregano.style} className="md:text-5xl text-2xl">Mestyle</p>
      <div className="flex space-x-4 text-xl">
        <div> © {new Date().getFullYear()}</div>
        <div className="hidden lg:block">Mestyle Company All rights reserved.</div>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="38"
          viewBox="0 0 69 64"
          fill="none"
        >
          <path
            d="M25.35 60.3314H43.65C58.9 60.3314 65 54.6652 65 40.4999V23.5014C65 9.33607 58.9 3.66992 43.65 3.66992H25.35C10.1 3.66992 4 9.33607 4 23.5014V40.4999C4 54.6652 10.1 60.3314 25.35 60.3314Z"
            stroke="#292D32"
            stroke-width="7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M34.4997 41.9175C40.3954 41.9175 45.1747 37.478 45.1747 32.0017C45.1747 26.5254 40.3954 22.0859 34.4997 22.0859C28.6041 22.0859 23.8247 26.5254 23.8247 32.0017C23.8247 37.478 28.6041 41.9175 34.4997 41.9175Z"
            stroke="#292D32"
            stroke-width="7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M51.6885 17.8359H51.7239"
            stroke="#292D32"
            stroke-width="7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
