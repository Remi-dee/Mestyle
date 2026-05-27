import Image from "next/image";
import Link from "next/link";
import google from "../../../public/icons/Google.png";
import arrowBack from "@/public/icons/arrowBack.png";
import Button from "../ui/button/button";
function SuccessMessage() {
  return (
    <div className="flex pb-4 relative font-lexend text-center">
      <div className="flex flex-col w-[500px] space-y-8 px-5  py-10 h-auto bg-white items-center ">
        <div>
          {" "}
          Congratulations on successfully registering with MeStyle! 🎉 To ensure
          you have the best experience tailored to your unique style, we invite
          you to select your style preferences. Choose the looks that resonate
          with you, and let us curate personalized fashion content just for you.
          Your style journey starts now! 🌟
        </div>

        <div className=" flex space-x-5">
          <div>
            <Button variant="secondary" className=" ">
              Skip
            </Button>
          </div>

          <div>
            <Button variant="secondary" className=" ">
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessMessage;
