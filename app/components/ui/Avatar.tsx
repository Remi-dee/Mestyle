"use client";

import { useId } from "react";

/**
 * Mestyle avatar — "Faces" direction. Renders a clean, on-brand illustrated
 * face generated deterministically from a seed (so a given user always gets the
 * same face), with real skin-tone range + African-fashion touches. Falls back
 * to a real photo (`src`) when present, or a brand monogram when there's no
 * identity yet. Anonymous by design: it's a cartoon, never the person's photo.
 */

type Skin = { b: string; l: string; s: string };
const SKINF: Skin[] = [
  { b: "#3F2616", l: "#5A3A24", s: "#2B1810" },
  { b: "#5A361F", l: "#784B2E", s: "#3C2314" },
  { b: "#774A2C", l: "#96613C", s: "#542F1B" },
  { b: "#95613A", l: "#B47E52", s: "#6B4326" },
  { b: "#B07E4F", l: "#CE9C6C", s: "#875B33" },
  { b: "#CF9E68", l: "#E8BF8F", s: "#A5783F" },
];
const HAIRF = [
  { b: "#140E0A", l: "#2A1F16" },
  { b: "#201510", l: "#3A281B" },
  { b: "#321D13", l: "#4E3020" },
];
const TILE = [
  "#B23A63", "#E0A458", "#2E9E92", "#6E3B63", "#2C3E57",
  "#D98BA6", "#C7574E", "#3F7A53", "#8E5BB0",
];
const WRAP = ["#E0A458", "#2E9E92", "#C7574E", "#D98BA6", "#8E5BB0", "#F0C64E"];

function hashSeed(str: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function rng(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function pick<T>(r: () => number, arr: T[]): T {
  return arr[Math.floor(r() * arr.length)];
}

function buildFace(seedStr: string, gid: string): string {
  const r = rng(hashSeed(seedStr || "mestyle"));
  const bg = pick(r, TILE);
  const sk = pick(r, SKINF);
  const hair = pick(r, HAIRF);
  const expr = pick(r, ["smile", "joy", "wink", "cool"]);
  const top = pick(r, ["afro", "gele", "fade", "bun", "fade", "afro"]);
  const eye = (cx: number) =>
    `<ellipse cx="${cx}" cy="54" rx="3.4" ry="4.1" fill="#fff"/>` +
    `<circle cx="${cx}" cy="54.6" r="2.5" fill="#2a1912"/>` +
    `<circle cx="${cx - 1}" cy="52.8" r="0.9" fill="#fff" opacity="0.95"/>`;

  const fid = `fs${gid}`, vid = `fv${gid}`, hid = `fh${gid}`;
  let s =
    `<defs>` +
    `<radialGradient id="${fid}" cx="38%" cy="33%" r="75%"><stop offset="0" stop-color="${sk.l}"/><stop offset="0.6" stop-color="${sk.b}"/><stop offset="1" stop-color="${sk.s}"/></radialGradient>` +
    `<radialGradient id="${vid}" cx="50%" cy="38%" r="80%"><stop offset="0.5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.22"/></radialGradient>` +
    `<linearGradient id="${hid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hair.l}"/><stop offset="1" stop-color="${hair.b}"/></linearGradient>` +
    `</defs>`;
  s += `<rect width="100" height="100" fill="${bg}"/>`;
  s += `<circle cx="50" cy="30" r="42" fill="#fff" opacity="0.07"/>`;
  s += `<rect width="100" height="100" fill="url(#${vid})"/>`;
  if (top === "afro") s += `<circle cx="50" cy="42" r="34" fill="url(#${hid})"/>`;
  if (top === "bun") s += `<circle cx="50" cy="18" r="10" fill="url(#${hid})"/>`;
  s += `<circle cx="25" cy="56" r="5" fill="${sk.b}"/><circle cx="75" cy="56" r="5" fill="${sk.b}"/>`;
  s += `<circle cx="50" cy="55" r="26" fill="url(#${fid})"/>`;
  if (top === "fade") s += `<path d="M24 52 A26 26 0 0 1 76 52 Q50 41 24 52 Z" fill="url(#${hid})"/>`;
  if (top === "bun") s += `<path d="M26 52 A24 24 0 0 1 74 52 Q50 43 26 52 Z" fill="url(#${hid})"/>`;
  if (top === "gele") {
    const w = pick(r, WRAP);
    s += `<path d="M22 48 Q34 6 50 18 Q66 6 78 48 Q64 34 50 36 Q36 34 22 48 Z" fill="${w}"/>`;
    s += `<path d="M27 44 Q40 16 52 22" stroke="#fff" stroke-opacity="0.28" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  }
  s += `<ellipse cx="35" cy="62" rx="4.6" ry="2.8" fill="#ff5c7a" opacity="0.16"/><ellipse cx="65" cy="62" rx="4.6" ry="2.8" fill="#ff5c7a" opacity="0.16"/>`;
  if (expr !== "cool") {
    s += `<path d="M35 47.5 Q40 45.5 45 47.5" stroke="${hair.b}" stroke-width="2.1" fill="none" stroke-linecap="round"/><path d="M55 47.5 Q60 45.5 65 47.5" stroke="${hair.b}" stroke-width="2.1" fill="none" stroke-linecap="round"/>`;
  }
  if (expr === "joy") {
    s += `<path d="M36 55 Q40.5 50 45 55" stroke="#2a1912" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M55 55 Q59.5 50 64 55" stroke="#2a1912" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  } else if (expr === "wink") {
    s += `<path d="M36 55 Q40 51 44 55" stroke="#2a1912" stroke-width="3" fill="none" stroke-linecap="round"/>` + eye(60);
  } else if (expr === "cool") {
    s += `<rect x="31" y="48" width="38" height="11" rx="5.5" fill="#20101a"/><rect x="34" y="50" width="12" height="3" rx="1.5" fill="#fff" opacity="0.30"/><rect x="54" y="50" width="8" height="3" rx="1.5" fill="#fff" opacity="0.20"/>`;
  } else {
    s += eye(40) + eye(60);
  }
  s += `<path d="M50 56 Q52.4 60 49.6 61" stroke="${sk.s}" stroke-width="1.8" fill="none" stroke-linecap="round" opacity="0.55"/>`;
  if (expr === "joy")
    s += `<path d="M40 63 Q50 75 60 63 Z" fill="#6e2634"/><path d="M44 65 Q50 69 56 65" fill="#ff8da3" opacity="0.5"/>`;
  else if (expr === "cool")
    s += `<path d="M44 66 Q50 70 56 66" stroke="#5c2330" stroke-width="3.2" fill="none" stroke-linecap="round"/>`;
  else
    s += `<path d="M41 64 Q50 73 59 64" stroke="#5c2330" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
  if (r() > 0.5)
    s += `<circle cx="24" cy="63" r="3.4" stroke="#F0C64E" stroke-width="2.2" fill="none"/>`;
  return `<svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${s}</svg>`;
}

function buildMonogram(name: string, gid: string): string {
  const letter = (name || "M").trim().charAt(0).toUpperCase() || "M";
  return (
    `<svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">` +
    `<defs><linearGradient id="m${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#C7527A"/><stop offset="1" stop-color="#8E2049"/></linearGradient></defs>` +
    `<rect width="100" height="100" fill="url(#m${gid})"/>` +
    `<text x="50" y="52" text-anchor="middle" dominant-baseline="central" font-family="system-ui, sans-serif" font-weight="700" font-size="48" fill="#fff">${letter}</text>` +
    `</svg>`
  );
}

interface AvatarProps {
  /** A real photo URL; takes priority when present. */
  src?: string | null;
  /** Stable identity to generate the face from (user id or username). */
  seed?: string | null;
  /** Display name — used for the monogram fallback and alt text. */
  name?: string | null;
  /** Pixel size (square). */
  size?: number;
  className?: string;
}

export default function Avatar({
  src,
  seed,
  name,
  size = 32,
  className = "",
}: AvatarProps) {
  const gid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const style = { width: size, height: size };

  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={name || "Avatar"}
        style={style}
        className={`rounded-full object-cover ${className}`}
      />
    );
  }

  const key = seed || name;
  const html = key ? buildFace(String(key), gid) : buildMonogram(String(name || "M"), gid);
  return (
    <span
      role="img"
      aria-label={name ? `${name}'s avatar` : "Avatar"}
      style={style}
      className={`inline-block shrink-0 overflow-hidden rounded-full align-middle ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
