"use client";
import Image from "next/image";
import Link from "next/link";
import google from "@/public/icons/Google.png";
import Button from "../../ui/button/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/app/redux/features/auth/authApi";
import InputField from "../../ui/inputField/inputField";
import AuthShell from "../AuthShell";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const googleLoginUrl =
  (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000/").replace(/\/$/, "") +
  "/auth/google/login";

function SignUp() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const { username, email, password } = formData;
    if (!username || !email || !password) return "All fields are required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email address.";
    if (password.length < 6) return "Password must be at least 6 characters long.";
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
      await register(formData).unwrap();
      router.push("/?view=signin");
    } catch (err: any) {
      setError(err.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <AuthShell
        title="Create your account"
        subtitle="Looks that fit your body and your vibe."
        footer={
          <>
            Already a member?{" "}
            <Link href="/?view=signin" className="font-semibold text-burgundy-400 hover:underline">
              Log in
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
          <span className="text-sm font-medium">Sign up with Google</span>
        </button>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-white/40">OR</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="flex flex-col gap-4">
          <InputField label="Username" name="username" value={formData.username} onChange={handleChange} placeholder="Enter your username" required />
          <InputField label="Email address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
          <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Create a password" required />
        </div>

        <div className="mt-6">
          <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </div>
      </AuthShell>
    </form>
  );
}

export default SignUp;
