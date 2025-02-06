"use client";
import Image from "next/image";
import Link from "next/link";
import sideImage from "@/public/images/backgrounds/signupBackground.png";
import google from "@/public/icons/Google.png";
import arrowBack from "@/public/icons/arrowBack.png";
import Button from "../../ui/button/button";
import waterMark from "@/public/icons/waterMark.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/app/redux/features/auth/authApi";
import { setCredentials } from "@/app/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import InputField from "../../ui/inputField/inputField";

interface FormData {
  userName: string;
  email: string;
  password: string;
}

function SignUp() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const { userName, email, password } = formData;
    if (!userName || !email || !password) {
      return "All fields are required.";
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return "Please enter a valid email address.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await register(formData).unwrap();
      if (response) {
        alert("registered successfully");
        console.log("our response", response);
      }
      dispatch(
        setCredentials({
          // user: { email: formData.email },
          access_token: response.access_token,
        })
      );
      router.push("/?view=signin");
    } catch (err: any) {
      setError(err.data?.message || "An unexpected error occurred.");
      console.log("our response2", err.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex pb-4 relative font-lexend">
        <div>
          <Image
            width={392}
            height={736}
            className="w-[350px] h-[650px] rounded-tl-[30px]"
            src={sideImage}
            alt="Signup Background"
          />
        </div>
        <div className="flex flex-col w-[500px] py-8 h-[650px] bg-white items-center">
          <div className="text-center">
            <div className="gap-[5px]">
              <div className="h-12 flex items-center justify-center">
                <Image
                  width={60}
                  height={50}
                  alt="Sign in with Google"
                  src={waterMark}
                />
              </div>
              <div className="text-black text-[32px] font-medium leading-10">
                Welcome to Mestyle
              </div>
              <div className="text-neutral-600 text-base font-normal">
                Explore recommendations that fit your style
              </div>
            </div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            <div className="space-y-[22px]">
              <div className="flex justify-center bg-white gap-3 border mt-[22px] px-6 py-3 cursor-pointer">
                <Image
                  width={25}
                  height={25}
                  alt="Sign up with Google"
                  src={google}
                />
                <span className="text-black text-lg font-normal">
                  Sign up with Google
                </span>
              </div>
              <div className="w-80 h-[19px] flex items-center gap-3">
                <div className="w-[136px] border"></div>
                <span className="text-black text-base">OR</span>
                <div className="w-[136px] border"></div>
              </div>
              <div className="flex flex-col gap-3">
                <InputField
                  label="Username"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                />
                <InputField
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                  type="email"
                />
                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
              </div>
              <Button type="submit" variant="secondary" className="w-full">
                {isLoading ? "Signing up..." : "Continue"}
              </Button>
              <div className="text-start">
                <span className="text-neutral-600 text-base">
                  Already a member?{" "}
                </span>
                <Link href="/?view=signin">
                  <span className="text-neutral-600 text-base underline">
                    Login
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white absolute top-0 left-0 w-[40px] h-12 z-20 flex items-center justify-center rounded-tl-[30px]">
          <Image width={10} height={25} alt="Back" src={arrowBack} />
        </div>
      </div>
    </form>
  );
}

export default SignUp;
