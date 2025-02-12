import "../styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import ScrollHelper from "./components/ScrollHelper";
import { Paytone_One, Outfit } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

// Primary Font
export const paytone = Paytone_One({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-paytone",
  weight: "400",
  fallback: ["Impact"],
  adjustFontFallback: false,
});

// Secondary font
export const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  fallback: ["system-ui"],
  adjustFontFallback: false,
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>August Meyers</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta property="og:site_name" content="meyersa.com" />
        <meta name="theme-color" content="#191f24" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
