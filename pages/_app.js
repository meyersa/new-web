import "../styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import ScrollHelper from "./components/ScrollHelper";
import { Paytone_One, Outfit } from "next/font/google";

// Primary Font
export const paytone = Paytone_One({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-paytone",
  weight: "400",
  fallback: ['Impact'],
  adjustFontFallback: false,

});

// Secondary font
export const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  fallback: ['system-ui'],
  adjustFontFallback: false,

});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${paytone.variable} ${outfit.variable}`}>
      <Head>
        <title>August Meyers</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      {/* Load jQuery */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" />

      {/* Helper Component */}
      <ScrollHelper />

      <Component {...pageProps} />
    </main>
  );
}
