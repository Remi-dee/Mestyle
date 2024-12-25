import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import googleIcon from "@/public/icons/Google.png";
import arrowBackIcon from "@/public/icons/arrowBack.png";
import waterMarkIcon from "@/public/icons/waterMark.png";
import Button from "../../ui/button/button";
// A reusable input field component
import { handleSignIn } from "./util/handleSignIn";
import { useAuthContext } from "@/app/composables/authContext";
import InputField from "../../ui/inputField/inputField";
import waterMark from "@/public/icons/waterMark.png";

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
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) return "Email and Password are required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Invalid email format.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await handleSignIn(formData);
      if (response.success && currentUser) {
        router.push("/profile");
      }
    } catch (err) {
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="flex flex-col w-[439px] py-[60px] bg-white items-center rounded-tl-[30px] shadow-md">
        <Image src={waterMarkIcon} alt="Logo" width={60} height={50} />
        <h2 className="text-[32px] font-medium text-black leading-10">
          Welcome back to Mestyle
        </h2>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="button"
          className="flex items-center gap-3 border border-gray-300 px-6 py-3 mt-4"
        >
          <Image src={googleIcon} alt="Google Icon" width={25} height={25} />
          <span className="text-black text-lg">Sign in with Google</span>
        </button>
        <div className="flex items-center my-4 w-full">
          <div className="flex-grow border-t border-gray-300" />
          <span className="px-4 text-gray-600">OR</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
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
        <Button type="submit" variant="secondary" className="w-full mt-4">
          Sign In
        </Button>
        <Link className="text-blue-500 mt-2" href="/?view=forgotpassword">
          Forgot Password?
        </Link>
        <Link className="text-gray-600 mt-4" href="/?view=signup">
          Don’t have an account? <span className="text-blue-500">Sign up</span>
        </Link>
        <div className="absolute top-0 left-0 p-4">
          <Image
            src={arrowBackIcon}
            alt="Back"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </div>
      </div>
    </form>
  );
}

export default SignIn;
