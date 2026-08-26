"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { oregano } from "../../localFonts/oregano/oregano";
import Button from "../ui/button/Button";

import heroLeft from "@/public/images/hero/heroImage_left.jpg";
import heroCenter from "@/public/images/hero/heroImage_center.jpg";
import heroRight from "@/public/images/hero/heroImage_right.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 + i * 0.09, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] },
  }),
};

const LandingHero: React.FC = () => {
  const router = useRouter();

  return (
    <section className="relative pt-10 pb-10 sm:pt-16 lg:pt-20">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Copy */}
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-burgundy-500/30 bg-burgundy-500/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-burgundy-300">
            <span className="h-1.5 w-1.5 rounded-full bg-burgundy-400 shadow-[0_0_10px] shadow-burgundy-400" />
            Style-matching · Made in Nigeria
          </span>

          <h1 className="mb-5 text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Looks that fit your body and your{" "}
            <span
              style={oregano.style}
              className="inline-block -rotate-3 text-burgundy-400"
            >
              vibe
            </span>
            .
          </h1>

          <p className="mb-8 max-w-md text-base text-white/70 sm:text-lg">
            Real, relatable outfits from real creators — matched to your{" "}
            <span className="font-semibold text-white">
              size, shape and skin tone
            </span>
            , and the{" "}
            <span className="font-semibold text-white">occasions and colours</span>{" "}
            you love. Owambe to office.
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <Button onClick={() => router.push("/?view=signup")}>
              Find my looks →
            </Button>
            <Button variant="secondary" onClick={() => router.push("/explore")}>
              Browse looks
            </Button>
          </div>

          <p className="mt-5 flex flex-wrap items-center gap-2 text-sm text-white/40">
            Free to start
            <span className="h-1 w-1 rounded-full bg-white/40" />
            Every body, every shade
            <span className="h-1 w-1 rounded-full bg-white/40" />
            Share to WhatsApp
          </p>
        </motion.div>

        {/* M-collage — fluid widths (aspect-ratio + flex) so it never overflows */}
        <div className="relative mx-auto flex w-full max-w-[420px] items-start justify-center gap-2 sm:gap-3">
          <div className="pointer-events-none absolute inset-[-14%_-6%] z-0 bg-[radial-gradient(circle_at_50%_42%,rgba(201,74,113,0.26),transparent_62%)] blur-[8px]" />

          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="relative z-[1] aspect-[120/248] flex-1 overflow-hidden rounded-2xl shadow-[0_24px_50px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/5"
          >
            <Image src={heroLeft} alt="Creator look — street style" fill className="object-cover object-top" sizes="(max-width:640px) 30vw, 160px" />
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="relative z-[1] mt-[5%] aspect-[116/190] flex-1 overflow-hidden rounded-2xl shadow-[0_24px_50px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/5"
          >
            <Image src={heroCenter} alt="Creator look — city couple" fill className="object-cover object-top" sizes="(max-width:640px) 30vw, 150px" />
          </motion.div>

          <motion.div
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="relative z-[1] aspect-[120/248] flex-1 overflow-hidden rounded-2xl shadow-[0_24px_50px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/5"
          >
            <Image src={heroRight} alt="Creator look — bold & bright" fill className="object-cover object-top" sizes="(max-width:640px) 30vw, 160px" />
          </motion.div>

          {/* Floating match chips */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute left-0 top-[38%] z-[3] inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-grayDark/80 px-2 py-1 text-[11px] font-bold text-white backdrop-blur-sm sm:px-2.5 sm:py-1.5 sm:text-xs"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-burgundy-300">94%</span> your vibe
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.62 }}
            className="absolute right-0 top-[22%] z-[3] rounded-full border border-white/15 bg-grayDark/80 px-2 py-1 text-[11px] font-bold text-white backdrop-blur-sm sm:px-2.5 sm:py-1.5 sm:text-xs"
          >
            Fits hourglass
          </motion.span>

          {/* Scroll cue = middle stroke of the M + "keep scrolling".
              Centering lives on the static <a> (Tailwind -translate-x-1/2); the
              bob animates translateY on the inner span so it can't clobber the
              horizontal centering transform. */}
          <a
            href="#every-body"
            aria-label="Scroll to see more"
            className="absolute bottom-[-1%] left-1/2 z-[4] -translate-x-1/2"
          >
            <motion.span
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-grayDark/70 text-burgundy-400 shadow-[0_10px_26px_-8px_rgba(201,74,113,0.75)] backdrop-blur-sm"
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </motion.span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
