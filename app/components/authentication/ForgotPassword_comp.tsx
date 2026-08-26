"use client";
import Link from "next/link";
import { useState } from "react";
import Button from "../ui/button/Button";
import InputField from "../ui/inputField/inputField";
import AuthShell from "./AuthShell";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No password-reset endpoint yet — acknowledge honestly rather than
    // implying an email was sent.
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <AuthShell
        title="Forgot password"
        subtitle="Enter your email and we'll help you get back in."
        footer={
          <>
            Remember it?{" "}
            <Link href="/?view=signin" className="font-semibold text-burgundy-400 hover:underline">
              Back to log in
            </Link>
          </>
        }
      >
        {submitted ? (
          <div className="rounded-lg border border-burgundy-500/30 bg-burgundy-500/10 px-4 py-3 text-sm text-white/80">
            Password reset by email is coming soon. For now, reach us at{" "}
            <span className="font-semibold text-burgundy-300">support@mestyle.app</span> and
            we&apos;ll help you reset it.
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <InputField
                label="Email address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="mt-6">
              <Button type="submit" variant="primary" className="w-full">
                Continue
              </Button>
            </div>
          </>
        )}
      </AuthShell>
    </form>
  );
}

export default ForgotPassword;
