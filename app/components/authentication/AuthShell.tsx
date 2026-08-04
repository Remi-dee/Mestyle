"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { oregano } from "../../localFonts/oregano/oregano";

interface AuthShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * Shared dark, on-brand, responsive card chrome for all auth screens
 * (sign in / sign up / forgot password). Full-width on mobile, capped by the
 * Modal's max-w-md, so it never overflows small screens.
 */
const AuthShell: React.FC<AuthShellProps> = ({ title, subtitle, children, footer }) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
      className="relative w-full rounded-2xl border border-white/10 bg-[#1b1417] p-6 font-lexend shadow-2xl sm:p-8"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={() => router.push("/")}
        className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
      >
        ✕
      </button>

      <div className="mb-6 text-center">
        <div style={oregano.style} className="mb-2 text-3xl leading-none text-white">
          <span className="text-burgundy-400">Me</span>style
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-1.5 max-w-xs text-sm text-white/55">{subtitle}</p>}
      </div>

      {children}

      {footer && <div className="mt-6 text-center text-sm text-white/55">{footer}</div>}
    </motion.div>
  );
};

export default AuthShell;
