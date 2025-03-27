import "../styles/globals.css";
import Head from "next/head";
import { Paytone_One, Outfit } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
  
  /**
   * Fix for Scrolling to top 
   * Supposedly disables all scrolling for route changes as it can be buggy
   */
  const router = useRouter();
  useEffect(() => {
      const handleRouteChange = () => {
          window.scrollTo(0, 0);
      };
      router.events.on('routeChangeComplete', handleRouteChange);
      return () => {
          router.events.off('routeChangeComplete', handleRouteChange);
      };
  }, [router]);

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
