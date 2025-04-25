import Image from "next/image";
import React from "react";

export default function Edit() {
  return (
    <div className="bg-[#121212] min-h-screen flex items-center justify-center p-4">
      <div className="bg-[#1E1E1E] w-full max-w-md rounded-2xl shadow-lg overflow-hidden">
        {/* Profile Header with ID */}
        <div className="flex justify-end p-4 text-gray-500 text-sm">
          245566742-2
        </div>

        {/* Profile Picture */}
        <div className="flex justify-center mb-4">
          <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-gray-700">
            <Image
              src="https://via.placeholder.com/150"
              alt="Damien Smith"
              className="w-full h-full object-cover"
              width={20}
              height={30}
            />
          </div>
        </div>

        {/* Name and Age */}
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold">Damien Smith</h1>
          <p className="text-gray-400">Male - 34 yrs 6 mos</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-6 px-6">
          <button className="flex-1 bg-[#333333] text-white py-3 rounded-lg flex items-center justify-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>Call</span>
          </button>
          <button className="flex-1 bg-[#333333] text-white py-3 rounded-lg flex items-center justify-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>Email</span>
          </button>
          <button className="flex-1 bg-[#333333] text-white py-3 rounded-lg flex items-center justify-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>Schedule</span>
          </button>
        </div>

        {/* Personal Details */}
        <div className="mt-6 px-6 pb-6 space-y-4 text-white">
          <div>
            <h2 className="text-gray-400 text-sm">DOB</h2>
            <p>17 / 02 / 1990</p>
          </div>
          <div>
            <h2 className="text-gray-400 text-sm">Address</h2>
            <p>5200 Collins Ave</p>
            <p>Sunny Isles Beach, Florida 33160</p>
          </div>
          <div>
            <h2 className="text-gray-400 text-sm">Contacts</h2>
            <p>Email: damiengsmith@gmail.com</p>
            <p>Mobile: (405) 343-3446</p>
          </div>
          <div>
            <h2 className="text-gray-400 text-sm">Next Visit</h2>
            <p>17 May Monday</p>
            <p className="text-sm text-blue-500">10:15 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
