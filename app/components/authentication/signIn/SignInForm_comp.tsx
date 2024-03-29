import Image from "next/image";
import Link from "next/link";

import google from "@/public/icons/Google.png";
import arrowBack from "@/public/icons/arrowBack.png";
import Button from "../../ui/button/button";
import waterMark from "@/public/icons/waterMark.png";
import { handleSignIn } from "./util/handleSignin";
import { useState } from "react";
import { useAuthContext } from "@/app/composables/authContext";
import { useRouter } from "next/navigation";
interface FormData {
  email: string;
  password: string;
}

function SignIn(): JSX.Element {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObject = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const userCred = await handleSignIn(formDataObject);
      console.log("here is" + userCred.success);
      if (userCred.success && currentUser) {
        router.push("/profile");
      }
    } catch (error) {
      // Handle errors if needed
      console.error("Error in handleSignUp:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex pb-4 relative font-lexend">
        <div className="flex flex-col w-[439px]  py-[60px] h-auto bg-white items-center rounded-tl-[30px]">
          <div className=" text-center ">
            <div className=" h-12 flex items-center justify-center ">
              <Image
                width={60}
                height={50}
                alt="Mestyle Logo"
                src={waterMark}
                className=""
              />
            </div>

            <div className="text-black text-center text-[32px] w-[317px] font-medium leading-10">
              Welcome back to Mestyle
            </div>
            <div className="space-y-[22px]">
              <div className="flex justify-center gap-3 border border-spacing-2 mt-[22px] px-6 py-3">
                <div className="">
                  <Image
                    width={25}
                    height={25}
                    alt="Sign in with Google"
                    src={google}
                  />
                </div>
                <div className="text-black text-lg font-normal leading-snug ">
                  Sign in with Google
                </div>
              </div>

              <div className="w-80 h-[19px] items-center justify-center  gap-3 inline-flex">
                <div className="w-[130px] h-[0px] rotate-180 border border-neutral-300"></div>
                <div className="text-black text-base font-normal  leading-tight">
                  OR
                </div>
                <div className="w-[130px] h-[0px]  rotate-180 border border-neutral-300"></div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="email"
                    className="block text-sm text-start font-medium text-gray-700"
                  >
                    Email
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
                      placeholder="Enter your email"
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
                  </div>{" "}
                  <div className="text-start ">
                    <Link href="#">
                      <span className="text-neutral-600 text-base font-normal  leading-tight">
                        Forgot Password?
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <Button variant="secondary" className=" w-full">
                  Continue
                </Button>
              </div>
            </div>

            <div className="bg-white absolute top-0 left-0 w-[40px] h-12 flex items-center justify-center rounded-tl-[30px] ">
              <Image
                width={null}
                height={null}
                alt="Close Signin"
                src={arrowBack}
                className="w-[10px] h-[25px]"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignIn;
