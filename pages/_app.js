import '../styles/globals.css'

export default function App({
  Component,
  pageProps,
}) {
  return (
    <div>
      <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

        <Component {...pageProps} />
    </div>
  )
};