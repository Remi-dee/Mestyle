import Image from "next/image";
import React from "react";
import Button from "../ui/button/template";

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
            <Button variant="primary">Start Exploring</Button>
          </div>
        </div>
      </section>

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

      <section className="w-full lg:h-screen lg:p-24 p-6 bg-[url('/images/bg-image-2.png')] bg-no-repeat bg-cover">
        <div className="h-full w-full p-4 flex items-center">
          <div className="lg:w-3/6 w-4/5 lg:space-y-6 space-y-4 text-white">
            <p className="text-2xl lg:text-4xl font-bold">
              Have Questions or FeedBack?
            </p>
            <p className="text-xs lg:text-2xl">
              We&apos;re here to help! If you have any questions, feedback, or
              inquiries, feel free to reach out to us. We value your input and
              are committed to providing the best experience for our users.
            </p>
            <Button variant="primary"> Email Us</Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
