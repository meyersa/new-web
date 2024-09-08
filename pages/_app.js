import '../styles/globals.css'
import Head from 'next/head'

export default function App({
  Component,
  pageProps,
}) {
  return (
    <div>
      <Head>
        <title>August Meyers</title>
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
      </Head>
      <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

        <Component {...pageProps} />
    </div>
  )
};