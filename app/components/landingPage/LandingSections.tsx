"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { oregano } from "../../localFonts/oregano/oregano";
import Button from "../ui/button/Button";

/* Reveal-on-scroll wrapper */
const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({
  children,
  className = "",
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* Full-bleed band + padded, max-width inner container */
const Section: React.FC<{
  children: React.ReactNode;
  id?: string;
  band?: boolean;
  className?: string;
}> = ({ children, id, band = false, className = "py-14 sm:py-24" }) => (
  <section
    id={id}
    className={`px-4 sm:px-6 lg:px-8 ${
      band ? "border-y border-white/10 bg-black/20" : ""
    } ${id ? "scroll-mt-20" : ""} ${className}`}
  >
    <div className="mx-auto max-w-6xl">{children}</div>
  </section>
);

const SectionHead: React.FC<{ kicker: string; title: React.ReactNode; sub: string }> = ({
  kicker,
  title,
  sub,
}) => (
  <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-14">
    <p className="mb-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-burgundy-300">{kicker}</p>
    <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">{title}</h2>
    <p className="text-white/60 sm:text-lg">{sub}</p>
  </div>
);

const occasions = ["Owambe", "Aso-ebi", "Church", "Office", "Traditional", "Date night"];

const bodyShapes = [
  { label: "Hourglass", src: "/images/body/women/hourglass.svg" },
  { label: "Rectangle", src: "/images/body/women/rectangle.svg" },
  { label: "Triangle", src: "/images/body/women/triangle.svg" },
  { label: "Trapezoid", src: "/images/body/men/trapezoid.svg" },
  { label: "Oval", src: "/images/body/men/oval.svg" },
];

const skinTones = ["#3b2417", "#4e2f1e", "#6a4229", "#875336", "#a56b44", "#c08a5e", "#d9a877", "#edc49f"];

const looks = [
  { img: "/images/medium-shot-woman-with-yellow-suit-2.png", pct: 94, title: "Bold yellow owambe set", vibe: "Owambe", body: "Hourglass", creator: "Adaeze Styles", price: "₦18,500" },
  { img: "/images/conversation-nationality-work-male-business-classy.png", pct: 91, title: "Sharp office two-piece", vibe: "Office", body: "Trapezoid", creator: "Tunde Looks", price: "₦24,000" },
  { img: "/images/medium-shot-woman-posing-park-1.png", pct: 89, title: "Easy weekend casual", vibe: "Casual", body: "Rectangle", creator: "Zainab Vibes", price: "₦9,800" },
  { img: "/images/portrait-cool-man-with-sunglasses-dancing.png", pct: 88, title: "Statement date-night fit", vibe: "Date night", body: "Triangle", creator: "Keziah", price: "₦16,200" },
  { img: "/images/confident-woman-being-body-positive.png", pct: 86, title: "Church-ready elegance", vibe: "Church", body: "Hourglass", creator: "Grace Ada", price: "₦21,000" },
  { img: "/images/charming-man-posing-with-copy-space-1.png", pct: 84, title: "Traditional aso-ebi look", vibe: "Traditional", body: "Oval", creator: "Emeka Style", price: "₦27,500" },
];

const steps = [
  { n: "1", title: "Build your persona", body: "Your body — size, shape, skin tone. And your vibe — occasions, colours, style.", chips: ["Body", "Vibe"] },
  { n: "2", title: "Get matched", body: "Complete looks ranked for you, each showing why it fits — body and vibe.", chips: ["94% match", "Real creators"] },
  { n: "3", title: "Save & share", body: "Keep what you love and send it straight to your group chat on WhatsApp.", chips: ["Save", "WhatsApp"] },
];

const LandingSections: React.FC = () => {
  const router = useRouter();
  const shareUrl =
    "https://wa.me/?text=" + encodeURIComponent("Find looks that match your vibe on Mestyle");

  return (
    <div className="font-lexend">
      {/* Occasions strip */}
      <Section band className="border-y border-white/10 bg-black/20 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2.5 py-5">
          <span className="mr-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
            Built for how Nigeria dresses
          </span>
          {occasions.map((o) => (
            <span key={o} className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm font-medium text-white/70">
              {o}
            </span>
          ))}
        </div>
      </Section>

      {/* Two pillars */}
      <Section>
        <SectionHead
          kicker="What makes a look yours"
          title="Two things have to be right"
          sub="Most apps get one, at best. Mestyle matches on both — because a look only feels like you when it fits your body and your vibe."
        />
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {[
            { tag: "your body", h: "Size, shape & skin tone", p: "Looks that actually flatter your frame and complement your complexion — not one idealized body type." },
            { tag: "your vibe", h: "Occasion, colour & culture", p: "From owambe to the office, in the colours and styles you love — grounded in how you really dress." },
          ].map((p, i) => (
            <Reveal key={p.tag} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 transition-transform duration-300 hover:-translate-y-1">
                <div style={oregano.style} className="mb-1.5 text-2xl text-burgundy-400">{p.tag}</div>
                <h3 className="mb-2 text-lg font-bold text-white">{p.h}</h3>
                <p className="text-sm text-white/60">{p.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Body inclusion */}
      <Section id="every-body" band className="border-y border-white/10 bg-black/20 py-14 scroll-mt-20 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.82fr]">
          <Reveal>
            <p className="mb-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-burgundy-300">Every body. Every shade.</p>
            <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              Matched to your real body — not an idealized one
            </h2>
            <p className="text-white/60">
              Tell us your shape and skin tone once. Mestyle ranks looks that flatter you — for men and women, every build, every complexion.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {bodyShapes.map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-1.5">
                  <div className="grid h-[86px] w-[58px] place-items-center rounded-xl border border-white/10 bg-white/[0.06] p-2">
                    {/* brightness-0 invert renders any silhouette as clean white.
                        Plain <img> (not next/image) so the recolor filter applies to the SVG. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.src} alt={s.label} className="h-full w-full object-contain opacity-80 [filter:brightness(0)_invert(1)]" />
                  </div>
                  <span className="text-[11px] text-white/40">{s.label}</span>
                </div>
              ))}
            </div>

            <p className="mb-2.5 mt-6 text-xs font-semibold uppercase tracking-[0.1em] text-burgundy-300">Skin tones — deep to fair</p>
            <div className="flex flex-wrap gap-2.5">
              {skinTones.map((t) => (
                <span key={t} className="h-7 w-7 rounded-full ring-1 ring-white/10" style={{ backgroundColor: t }} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-2xl shadow-[0_30px_60px_-22px_rgba(0,0,0,0.7)]">
              <div className="relative h-[340px] w-full sm:h-[440px]">
                <Image src="/images/confident-woman-being-body-positive.png" alt="Body-positive creator look" fill className="object-cover object-top" sizes="(max-width:1024px) 100vw, 40vw" />
              </div>
              <span className="absolute bottom-4 left-4 z-[2] text-lg font-bold text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.7)]">
                Confidence in every shape.
              </span>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Feed preview */}
      <Section>
        <SectionHead
          kicker="Your feed"
          title="A feed that finally feels like you"
          sub="Every look shows its match — and why: the occasion, the colours, the shape it flatters. No mystery algorithm."
        />
        <div className="columns-2 gap-3.5 md:columns-3">
          {looks.map((l) => (
            <div key={l.title} className="mb-3.5 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="relative">
                <div className="relative h-56 w-full">
                  <Image src={l.img} alt={l.title} fill className="object-cover" sizes="(max-width:768px) 50vw, 33vw" />
                </div>
                <span className="absolute left-2.5 top-2.5 z-[2] inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-grayDark/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-burgundy-300">{l.pct}%</span> match
                </span>
              </div>
              <div className="p-3">
                <p className="mb-2 text-sm font-semibold text-white">{l.title}</p>
                <div className="mb-2.5 flex flex-wrap gap-1.5">
                  <span className="rounded-md border border-burgundy-500/25 bg-burgundy-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-burgundy-300">{l.vibe}</span>
                  <span className="rounded-md border border-emerald-500/25 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300">{l.body}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="h-5 w-5 rounded-full bg-gradient-to-br from-burgundy-300 to-burgundy-800" />
                    <span className="text-[11px] font-semibold text-white/80">{l.creator}</span>
                  </div>
                  <span className="text-xs font-bold text-white">{l.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section id="how" band className="border-y border-white/10 bg-black/20 py-14 scroll-mt-20 sm:py-24">
        <SectionHead kicker="How it works" title="Three steps to your looks" sub="Set up once. Mestyle does the matching from there." />
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 transition-transform duration-300 hover:-translate-y-1">
                <div style={oregano.style} className="mb-3.5 text-3xl leading-none text-burgundy-500">{s.n}</div>
                <h3 className="mb-2 text-lg font-bold text-white">{s.title}</h3>
                <p className="text-sm text-white/60">{s.body}</p>
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {s.chips.map((c) => (
                    <span key={c} className="rounded-md border border-burgundy-500/25 bg-burgundy-500/10 px-2 py-1 text-xs font-semibold text-burgundy-300">{c}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Differentiator */}
      <Section>
        <SectionHead
          kicker="Why Mestyle"
          title="Real looks. Real bodies. No avatars."
          sub="Other style apps match you to a cropped outfit on a strange digital character with one body type. That's not relatable. We match whole looks to your real shape, tone and vibe."
        />
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 opacity-75">
              <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.1em] text-white/40">Everywhere else</p>
              <h3 className="mb-2 text-lg font-bold leading-snug text-white">A cropped digital outfit on a one-size avatar</h3>
              <p className="text-sm text-white/60">Metaverse mannequins and half-looks that never reflect your body, your shade, or your occasion.</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-2xl border border-burgundy-500/30 bg-gradient-to-b from-burgundy-500/[0.14] to-burgundy-900/[0.06] p-6">
              <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.1em] text-burgundy-300">Mestyle</p>
              <h3 className="mb-2 text-lg font-bold leading-snug text-white">A creator&apos;s complete look, matched to your body &amp; vibe</h3>
              <p className="text-sm text-white/60">Full outfits styled by real people — ranked to your shape, skin tone, occasions and colours, with the reasons shown.</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Creator band */}
      <Section id="creators" className="scroll-mt-20 pb-14 sm:pb-24">
        <Reveal>
          <div className="relative grid items-center gap-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-burgundy-900 to-burgundy-950 p-8 sm:p-12 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="relative z-[2]">
              <p className="mb-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-burgundy-300">For creators &amp; stylists</p>
              <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Your looks, in front of the right people</h2>
              <p className="mb-6 max-w-md text-white/80">
                Share your complete looks and reach users who dress for your vibe — and whose bodies your styling actually flatters.
              </p>
              <Button onClick={() => router.push("/?view=signup")}>Become a creator</Button>
            </div>
            <div className="relative z-[2] space-y-3">
              {[
                { b: "Your vibe", s: "reaches users who chose it" },
                { b: "Complete looks", s: "not single items" },
              ].map((c) => (
                <div key={c.b} className="rounded-xl border border-white/10 bg-grayDark/40 p-4">
                  <b className="block text-base font-bold text-white">{c.b}</b>
                  <span className="text-sm text-white/70">{c.s}</span>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(221,116,147,0.4),transparent_70%)]" />
          </div>
        </Reveal>
      </Section>

      {/* Final CTA */}
      <Section className="py-16 text-center sm:py-28">
        <p className="mb-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-burgundy-300">Ready when you are</p>
        <h2 className="mx-auto mb-4 max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Find looks that fit your body and your{" "}
          <span style={oregano.style} className="text-burgundy-400">vibe</span>.
        </h2>
        <p className="mx-auto mb-7 max-w-md text-white/60">Two minutes to set up. A feed that finally feels like you.</p>
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Button onClick={() => router.push("/?view=signup")}>Get started free →</Button>
          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-[#1f9d55] px-6 py-3 font-semibold text-white shadow-[0_12px_26px_-12px_rgba(31,157,85,0.8)] transition hover:brightness-110"
          >
            Share on WhatsApp
          </a>
        </div>
      </Section>
    </div>
  );
};

export default LandingSections;
