"use client";
import { AnimatePresence } from "framer-motion";
import HomePage from "./components/landingPage/homePage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home(): JSX.Element | null {
  const [mounted, setMounted] = useState<boolean | undefined>();
  const router = useRouter();

  useEffect(() => {
    // Gate: logged-in users skip the marketing landing and go to their feed.
    // Auth is in an httpOnly cookie, so we read the readable "mestyle_authed"
    // flag cookie. The auth modal opens on "/?view=..." so don't redirect
    // mid-auth-flow.
    const authed =
      typeof document !== "undefined" &&
      document.cookie.split("; ").some((c) => c.startsWith("mestyle_authed="));
    const view = new URLSearchParams(window.location.search).get("view");

    if (authed && !view) {
      router.replace("/dashboard");
      return;
    }
    setMounted(true);
  }, [router]);

  if (!mounted) return null;

  return (
    <main className="bg-grayDark font-lexend  flex justify-center">
      <div className="max-w-screen-2xl">
        <AnimatePresence>
          <HomePage />
        </AnimatePresence>
      </div>
    </main>
  );
}
