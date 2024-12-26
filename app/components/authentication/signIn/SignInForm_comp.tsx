import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import google from "@/public/icons/Google.png";
import arrowBack from "@/public/icons/arrowBack.png";
import waterMark from "@/public/icons/waterMark.png";
import Button from "../../ui/button/button";
import { handleSignIn } from "./util/handleSignin";
import { useAuthContext } from "@/app/composables/authContext";
import InputField from "../../ui/inputField/inputField";
import { useLoginMutation } from "@/app/redux/features/auth/authApi";
import { useDispatch } from "react-redux";

interface FormData {
  email: string;
  password: string;
}

function SignIn(): JSX.Element {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      return "All fields are required.";
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return "Please enter a valid email address.";
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

    setError(null); // Clear previous errors
    try {
      const response = await login(formData).unwrap();
      if (response) {
        alert("login successful");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("Error during sign-in:", err);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex pb-4 relative font-lexend">
        <div className="flex flex-col w-[439px] py-[60px] h-auto bg-white items-center rounded-tl-[30px]">
          <div className="text-center">
            <div className="h-12 flex items-center justify-center">
              <Image
                width={60}
                height={50}
                alt="Mestyle Logo"
                src={waterMark}
              />
            </div>
            <div className="text-black text-center text-[32px] w-[317px] font-medium leading-10">
              Welcome back to Mestyle
            </div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            <div className="space-y-[22px]">
              <div className="flex justify-center gap-3 border border-spacing-2 mt-[22px] px-6 py-3 cursor-pointer">
                <Image
                  width={25}
                  height={25}
                  alt="Sign in with Google"
                  src={google}
                />
                <span className="text-black text-lg font-normal leading-snug">
                  Sign in with Google
                </span>
              </div>

              <div className="w-[350px] h-[19px] flex items-center gap-3">
                <div className="w-[200px] border border-neutral-300"></div>
                <span className="text-black text-base font-normal leading-tight">
                  OR
                </span>
                <div className="w-[200px] border border-neutral-300"></div>
              </div>

              <div className="flex flex-col gap-3">
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <div className="text-start">
                  <Link href="#">
                    <span className="text-neutral-600 text-base font-normal leading-tight">
                      Forgot Password?
                    </span>
                  </Link>
                </div>
              </div>

              <Button type="submit" variant="secondary" className="w-full">
                Continue
              </Button>
            </div>
            <div className="bg-white absolute top-0 left-0 w-[40px] h-12 flex items-center justify-center rounded-tl-[30px]">
              <Image
                width={10}
                height={25}
                alt="Close Signin"
                src={arrowBack}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignIn;
