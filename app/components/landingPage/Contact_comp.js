import Button from "../ui/button/template";

function Contact() {
  return (
    <>
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

export default Contact;
