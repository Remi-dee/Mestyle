import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import google from "@/public/icons/Google.png";
import arrowBack from "@/public/icons/arrowBack.png";
import waterMark from "@/public/icons/waterMark.png";
import Button from "../../ui/button/Button";
import { handleSignIn } from "./util/handleSignin";
import InputField from "../../ui/inputField/inputField";
import { useLoginMutation } from "@/app/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/app/redux/features/auth/authSlice";

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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Store the token
      localStorage.setItem("access_token", token);
      dispatch(setCredentials({ access_token: token }));

      // Navigate to the dashboard
      router.push("/dashboard");
    }
  }, [router, dispatch]);

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
  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:4000/auth/google/login";
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
      console.log("the first access token", response);
      if (response) {
        // Store access token

        console.log("the second access token", response.access_token);
        localStorage.setItem("access_token", response.access_token);
        dispatch(
          setCredentials({
            access_token: response?.access_token,
            user: response.user,
          })
        );
        alert("Login successful");
        router.push("/dashboard");
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
        <div className="flex flex-col w-[439px] py-[60px] h-auto dark:bg-gray-900 bg-white items-center rounded-tl-[30px]">
          <div className="text-center">
            <div className="h-12 flex items-center justify-center">
              <Image
                width={60}
                height={50}
                alt="Mestyle Logo"
                src={waterMark}
              />
            </div>
            <div className="dark:text-white text-black text-center text-[32px] w-[317px] font-medium leading-10">
              Welcome back to Mestyle
            </div>
            {error && (
              <div className="text-red-500 dark:text-red-400 text-sm mt-2">
                {error}
              </div>
            )}
            <div className="space-y-[22px]">
              <div className="flex justify-center gap-3 border dark:border-gray-700 border-gray-200 dark:hover:bg-gray-800 hover:bg-gray-50 transition-colors mt-[22px] px-6 py-3 cursor-pointer rounded-lg">
                <Image
                  width={25}
                  height={25}
                  alt="Sign in with Google"
                  src={google}
                />
                <button onClick={handleGoogleSignIn} type="button">
                  <span className="dark:text-white text-black text-lg font-normal leading-snug">
                    Sign in with Google
                  </span>
                </button>
              </div>

              <div className="w-[350px] h-[19px] flex items-center gap-3">
                <div className="w-[200px] border dark:border-gray-700 border-gray-300"></div>
                <span className="dark:text-gray-400 text-gray-600 text-base font-normal leading-tight">
                  OR
                </span>
                <div className="w-[200px] border dark:border-gray-700 border-gray-300"></div>
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
                    <span className="dark:text-gray-400 text-gray-600 text-base font-normal leading-tight hover:text-burgundy-500 dark:hover:text-burgundy-400 transition-colors">
                      Forgot Password?
                    </span>
                  </Link>
                </div>
              </div>

              <Button type="submit" variant="secondary" className="w-full">
                Continue
              </Button>
            </div>
            <div className="dark:bg-gray-900 bg-white absolute top-0 left-0 w-[40px] h-12 flex items-center justify-center rounded-tl-[30px]">
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
