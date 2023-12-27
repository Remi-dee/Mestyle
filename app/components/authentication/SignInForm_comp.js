import Image from "next/image";
import Link from "next/link";
import sideImage from "@/public/images/backgrounds/signupBackground.png";
import google from "@/public/icons/Google.png";
import arrowBack from "@/public/icons/arrowBack.png";
import Button from "../ui/button/template";
import waterMark from "@/public/icons/waterMark.png";
function SignIn() {
  return (
    <form>
      <div className="flex pb-4 relative">
        <div className="flex flex-col w-[439px]  py-[60px] h-auto bg-white items-center ">
          <div className=" text-center ">
            <div className=" h-12 flex items-center justify-center ">
              <Image
                width={60}
                height={50}
                alt="Sign in with Google"
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
                    htmlFor="username"
                    className="block text-sm text-start font-medium text-gray-700"
                  >
                    Username
                  </label>

                  <div className="w-full   gap-1 inline-flex">
                    <input
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
                    htmlFor="password"
                    className="block text-sm text-start font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="w-full gap-1 inline-flex">
                    <input
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

            <div className="bg-white absolute top-0 left-0 w-[40px] h-12 flex items-center justify-center ">
              <Image
                width={null}
                height={null}
                alt="Sign in with Google"
                src={arrowBack}
                className="w-[10px] h-[25px]"
              />
            </div>

            <div className="bg-white absolute top-0 right-0 w-[40px] h-12 flex items-center justify-center ">
              <Image
                width={null}
                height={null}
                alt="Sign in with Google"
                src={waterMark}
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
