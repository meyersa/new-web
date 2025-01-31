import "../styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import ScrollHelper from "./components/ScrollHelper";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>August Meyers</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <Script src="https://code.jquery.com/jquery-3.7.1.min.js" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
      <ScrollHelper />
      <Component {...pageProps} />
    </div>
  );
}
