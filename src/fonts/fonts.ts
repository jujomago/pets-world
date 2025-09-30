import {
  Cherry_Bomb_One,
  Comic_Neue,
  Delicious_Handrawn,
  Delius_Unicase,
  Geist,
  Geist_Mono,
} from "next/font/google";
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const comicRelief = Comic_Neue({
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-comic-relief",
});

export const cherryBombOne = Cherry_Bomb_One({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cherry-bomb-one",
});

export const Delius = Delius_Unicase({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-delius",
});
