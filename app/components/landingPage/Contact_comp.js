import Image from "next/image";
import Button from "../ui/button/template";
import waterMark from "@/public/images/creator/waterMark.png";

function Contact() {
  return (
    <>
      <section className="flex flex-col justify-center h-[580px] lg:h-[570px] z-50 pl-6 md:pl-10  bg-[url('/images/bg-image-2.png')] bg-no-repeat bg-cover">
        <div className=" p-4 lg:pl-[50px]   space-y-8">
          <div className="lg:w-3/6 w-4/5 lg:space-y-6 space-y-4 text-white">
            <p className="text-2xl md:text-4xl font-bold ">
              Have Questions or FeedBack?
            </p>
            <p className="md:text-2xl ">
              We&apos;re here to help! If you have any questions, feedback, or
              inquiries, feel free to reach out to us. We value your input and
              are committed to providing the best experience for our users.
            </p>
          </div>
          <div>
            <Button variant="primary"> Email Us</Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
