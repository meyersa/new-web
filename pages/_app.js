import '../styles/globals.css'
import Head from 'next/head'
import Script from 'next/script'

export default function App({
  Component,
  pageProps,
}) {
  return (
    <div>
      <Head>
        <title>August Meyers</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Script src="https://code.jquery.com/jquery-3.7.1.min.js" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

        <Component {...pageProps} />
    </div>
  )
};