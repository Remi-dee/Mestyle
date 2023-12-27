"use client";
import { motion, AnimatePresence } from "framer-motion";
import HomePage from "./components/landingPage/template";
import Authentication from "./components/authentication/SignUpForm_comp";
import SignIn from "./components/authentication/SignInForm_comp";
import ForgotPassword from "./components/authentication/ForgotPassword_comp";
import SignUp from "./components/authentication/SignUpForm_comp";

export default function Home() {
  return (
    <main className="bg-grayDark font-lexend  flex justify-center">
      <div className="max-w-screen-2xl">
        <AnimatePresence>
          <HomePage />
          <SignIn/>
        </AnimatePresence>
      </div>
    </main>
  );
}
