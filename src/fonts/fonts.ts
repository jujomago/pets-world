import { Cherry_Bomb_One, Comic_Neue, Poppins } from "next/font/google";

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

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});
