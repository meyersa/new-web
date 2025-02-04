import Header from "./components/Header";
import TitlePage from "./components/TitlePage";
import Footer from "./components/Footer";
import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - August Meyers</title>
      </Head>
      <Header />
      <TitlePage header="404">
        <p>Page was not found</p>
      </TitlePage>
      <Footer />
    </>
  );
}
