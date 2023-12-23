import Image from "next/image";
import sideImage from "@/public/images/backgrounds/signupBackground.png";
import google from "@/public/icons/Google.png";
import arrowBack from "@/public/icons/arrowBack.png";
function Authentication() {
  return (
    <>
      <div className="flex pb-4">
        <div className="justify-start items-start gap-2.5 flex">
          <Image
            width={392}
            height={736}
            className="w-[392px] h-[736px] "
            src={sideImage}
            alt=""
          />
        </div>

        <div className="flex flex-col w-[439px] p-4 py-10 h-[736px] bg-white items-center ">
          <div className="text-center  ">
            <div className="gap-[5px] ">
              <div className="text-black text-[32px] font-medium leading-10">
                Welcome to Mestyle
              </div>
              <div className=" text-center text-neutral-600 text-base font-normal font-['Lexend'] leading-tight">
                Explore recommendation that fits your style
              </div>
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
                  Sign up with Google
                </div>
              </div>

              <div className="w-80 h-[19px] items-center gap-3 inline-flex">
                <div className="w-[136px] h-[0px] rotate-180 border border-neutral-300"></div>
                <div className="text-black text-base font-normal font-['Lexend'] leading-tight">
                  OR
                </div>
                <div className="w-[136px] h-[0px]  rotate-180 border border-neutral-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[831px] h-[736px] justify-start items-start inline-flex">
        <div className="justify-start items-start gap-2.5 flex">
          <Image
            width={392}
            height={736}
            className="w-[392px] h-[736px] rounded-tl-[30px]"
            src={sideImage}
            alt=""
          />
          <div className="justify-start items-start gap-2.5 flex">
            <div className="w-[63px] h-14 bg-white" />
          </div>
        </div>
        <div className="w-[439px] h-[736px] relative bg-white">
          <div className="w-80 left-[59px] top-[168px] absolute" />
          <div className="left-[58px] top-[62px] absolute flex-col justify-start items-end gap-[22px] inline-flex">
            <div className="flex-col justify-start items-start gap-[5px] flex">
              <div className="text-black text-[32px] font-medium font-['Lexend'] leading-10">
                Welcome to Mestyle
              </div>
              <div className="w-80 text-center text-neutral-600 text-base font-normal font-['Lexend'] leading-tight">
                Explore recommendation that fits your style
              </div>
            </div>
            <div className="flex-col justify-start items-start gap-[15px] flex">
              <div className="text-black text-lg font-normal font-['Lexend'] leading-snug">
                Sign up with Google
              </div>
            </div>
            <div className="justify-start items-center gap-3 inline-flex">
              <div className="w-[136px] h-[0px] origin-top-left rotate-180 border border-neutral-300"></div>
              <div className="text-black text-base font-normal font-['Lexend'] leading-tight">
                OR
              </div>
              <div className="w-[136px] h-[0px] origin-top-left rotate-180 border border-neutral-300"></div>
            </div>
            <div className="flex-col justify-start items-start gap-[13px] flex">
              <div className="flex-col justify-start items-start gap-1 flex">
                <div className="w-80 text-zinc-600 text-sm font-medium font-['Inter'] leading-[17.50px]">
                  Username
                </div>
                <div className="w-80 h-12 px-3 py-[11px] bg-white border border-neutral-300 justify-start items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-zinc-400 text-base font-normal font-['Inter'] leading-normal">
                    Enter your username
                  </div>
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-1 flex">
                <div className="w-80 text-zinc-600 text-sm font-medium font-['Inter'] leading-[17.50px]">
                  Email address
                </div>
                <div className="w-80 h-12 px-3 py-[11px] bg-white border border-neutral-300 justify-start items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-zinc-400 text-base font-normal font-['Inter'] leading-normal">
                    Enter your email
                  </div>
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-1 flex">
                <div className="w-80 text-zinc-600 text-sm font-medium font-['Inter'] leading-[17.50px]">
                  Password
                </div>
                <div className="w-80 h-12 px-3 py-[11px] bg-white border border-neutral-300 justify-start items-center gap-1 inline-flex">
                  <div className="justify-center items-center gap-2.5 flex">
                    <div className="w-[296px] text-zinc-400 text-base font-normal font-['Inter'] leading-normal">
                      Create a password
                    </div>
                    <div className="w-[22px] h-4 relative"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-80 h-12 px-6 py-3 bg-black border border-neutral-300 justify-center items-center gap-3 inline-flex">
              <div className="text-white text-lg font-normal font-['Lexend'] leading-snug">
                Continue
              </div>
            </div>
            <div className="w-80">
              <span className="text-neutral-600 text-base font-normal font-['Lexend'] leading-tight">
                Already a member?{" "}
              </span>
              <span className="text-neutral-600 text-base font-normal font-['Lexend'] underline leading-tight">
                Login
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Authentication;
