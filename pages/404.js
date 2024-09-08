import Header from "./components/Header";
import TitlePage from "./components/TitlePage";
import Link from "next/link";
import ColorBox from "./components/ColorBox";
import Footer from "./components/Footer";
import Image from "next/image";

export default function Custom404() {
  return (
    <div>
      <Header />
      <TitlePage>
        <h1>404</h1>
        <p>Page was not found</p>
      </TitlePage>
      <Footer />
    </div>
  );
}
