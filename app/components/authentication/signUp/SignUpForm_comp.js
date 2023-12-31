import Image from "next/image";
import Link from "next/link";
import sideImage from "@/public/images/backgrounds/signupBackground.png";
import google from "@/public/icons/Google.png";
import arrowBack from "@/public/icons/arrowBack.png";
import Button from "../../ui/button/template";
import waterMark from "@/public/icons/waterMark.png";
import { useState } from "react";
import { handleSignUp } from "./util/handleSignup";
function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.email, +"see it" + formData.password);
    const formDataObject = {
      email: formData.email,
      password: formData.password,
    };
    handleSignUp(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex pb-4 relative font-lexend ">
        <div className="">
          <Image
            width={392}
            height={736}
            className="w-[350px] h-[650px] rounded-tl-[30px]"
            src={sideImage}
            alt=""
          />
        </div>
        <div className="flex flex-col w-[500px] relative py-8 h-[650px] bg-white items-center ">
          <div className=" text-center ">
            <div className="gap-[5px] ">
              <div className=" h-12 flex items-center justify-center ">
                <Image
                  width={60}
                  height={50}
                  alt="Sign in with Google"
                  src={waterMark}
                  className=""
                />
              </div>
              <div className="text-black text-center text-[32px] font-medium leading-10">
                Welcome to Mestyle
              </div>
              <div className=" text-center text-neutral-600 text-base font-normal  leading-tight">
                Explore recommendation that fits your style
              </div>
            </div>

            <div className="space-y-[22px]">
              <div className="flex justify-center z-20 bg-white gap-3 border border-spacing-2 mt-[22px] px-6 py-3">
                <div className="">
                  <Image
                    width={25}
                    height={25}
                    alt="Sign in with Google"
                    src={google}
                  />
                </div>
                <div className="text-black  text-lg   font-normal leading-snug ">
                  Sign up with Google
                </div>
              </div>

              <div className="w-80 h-[19px] items-center  gap-3 inline-flex">
                <div className="w-[136px] h-[0px] rotate-180 border border-neutral-300"></div>
                <div className="text-black text-base font-normal  leading-tight">
                  OR
                </div>
                <div className="w-[136px] h-[0px]  rotate-180 border border-neutral-300"></div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="username"
                    className="block text-sm text-start font-medium text-gray-700"
                  >
                    Username
                  </label>

                  <div className="w-full   gap-1 inline-flex">
                    <input
                      value={formData.username}
                      onChange={handleChange}
                      name="username"
                      required
                      id="fullname"
                      type="text"
                      autoComplete="on"
                      className=" text-zinc-400    text-base font-normal w-full leading-normal bg-white border border-neutral-300"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="username"
                    className="block text-sm text-start font-medium text-gray-700"
                  >
                    Email Adress
                  </label>

                  <div className="w-full   gap-1 inline-flex">
                    <input
                      value={formData.email}
                      onChange={handleChange}
                      name="email"
                      required
                      id="email"
                      type="text"
                      autoComplete="on"
                      className=" text-zinc-400    text-base font-normal w-full leading-normal bg-white border border-neutral-300"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="password"
                    className="block text-sm text-start font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <div className="w-full gap-1 inline-flex">
                    <input
                      value={formData.password}
                      onChange={handleChange}
                      name="password"
                      required
                      id="password"
                      type="password"
                      autoComplete="on"
                      className=" text-zinc-400    text-base font-normal w-full leading-normal bg-white border border-neutral-300"
                      placeholder="Create a password"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Button type="submit" variant="secondary" className=" w-full">
                  Continue
                </Button>
              </div>

              <div className="text-start">
                <span className="text-neutral-600 text-base font-normal  leading-tight">
                  Already a member?
                </span>

                <Link href="#">
                  <span className="text-neutral-600 text-base font-normal underline leading-tight">
                    Login
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white absolute top-0 left-0 w-[40px] h-12 z-20 flex items-center justify-center rounded-tl-[30px] ">
          <Image
            width={null}
            height={null}
            alt="Sign in with Google"
            src={arrowBack}
            className="w-[10px] h-[25px]"
          />
        </div>
      </div>
    </form>
  );
}

export default SignUp;
