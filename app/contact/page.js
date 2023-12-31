"use client";
import React from "react";

import Button from "../components/ui/button/template";
import NavBar from "../components/landingPage/NavBar/NavBar";

function Page() {
  return (
    <div className="font-lexend">
      <NavBar />
      <section className="md:p-24 p-8">
        <div className="mb-8 w-full lg:w-4/6 mx-auto text-center text-white space-y-3">
          <h1 className="text-xl lg:text-6xl">Have Questions or Feedback?</h1>
          <p className="text-xs lg:text-xl">
            We&apos;re here to help! If you have any questions, feedback, or
            inquiries, feel free to reach out to us. We value your input and are
            committed to providing the best experience for our users.
          </p>
        </div>

        <div className="w-full md:w-10/12 lg:w-9/12 mx-auto p-12 bg-white">
          <form className="space-y-4 ">
            <div className="md:grid md:grid-cols-2 md:gap-10 mb:mb-8 gap-4 ">
              <input placeholder="First Name" className="col-span-1 w-full" />
              <input placeholder="Last Name" className="col-span-1 w-full" />
            </div>
            <div className="md:grid grid-cols-2 md:gap-10 mb-8 gap-4 ">
              <input placeholder="Email Address" className="w-full" />
              <input placeholder="Phone Number" className="w-full" />
            </div>
            <div className="w-[48.5%] mx-auto">
              <input placeholder="Object" className="w-full" />
            </div>
            <textarea placeholder="Message" className="w-full" />

            <div className="mx-auto w-1/12">
              <Button variant="secondary">Send</Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Page;
