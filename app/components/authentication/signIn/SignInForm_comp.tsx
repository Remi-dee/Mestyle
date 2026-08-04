"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import google from "@/public/icons/Google.png";
import Button from "../../ui/button/Button";
import InputField from "../../ui/inputField/inputField";
import AuthShell from "../AuthShell";
import { useLoginMutation } from "@/app/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/app/redux/features/auth/authSlice";

interface FormData {
  email: string;
  password: string;
}

const googleLoginUrl =
  (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000/").replace(/\/$/, "") +
  "/auth/google/login";

function SignIn(): JSX.Element {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) return "All fields are required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email address.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    try {
      const response = await login(formData).unwrap();
      // Auth is now in httpOnly cookies set by the server; nothing to store.
      dispatch(setCredentials({ user: response?.user }));
      router.push("/dashboard");
    } catch (err) {
      console.error("Error during sign-in:", err);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <AuthShell
        title="Welcome back"
        subtitle="Pick up where your style left off."
        footer={
          <>
            New to Mestyle?{" "}
            <Link href="/?view=signup" className="font-semibold text-burgundy-400 hover:underline">
              Create an account
            </Link>
          </>
        }
      >
        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={() => (window.location.href = googleLoginUrl)}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/15 bg-white/[0.03] px-6 py-3 text-white transition hover:bg-white/[0.08]"
        >
          <Image src={google} width={20} height={20} alt="" />
          <span className="text-sm font-medium">Sign in with Google</span>
        </button>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-white/40">OR</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="flex flex-col gap-4">
          <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
          <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
          <div className="text-right">
            <Link
              href="/?view=forgotpassword"
              className="text-sm text-white/55 transition-colors hover:text-burgundy-400"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
            {isLoading ? "Signing in..." : "Continue"}
          </Button>
        </div>
      </AuthShell>
    </form>
  );
}

export default SignIn;
