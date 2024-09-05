import Header from "./components/Header";
import TitlePage from "./components/TitlePage";
import Footer from "./components/Footer"
import Image from "next/image";

export default function Photography() {
  return (
    <div>
      <Header />
      <div>
        <TitlePage>
          <Image src="/images/code.png" height="500" width="500" alt="Code view" />
          <h1>Photography</h1>
          <p>Showcase of one of my main hobbies - Photography</p>
        </TitlePage>

      </div>
      <Footer />
    </div>
  );
}
