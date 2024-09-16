import Header from "./components/Header";
import TitlePage from "./components/TitlePage";
import Link from "next/link";
import ColorBox from "./components/ColorBox";
import Footer from "./components/Footer";
import StyledList from "./components/StyledList";

export default function Projects() {
  return (
    <div>
      <Header />
      <div>
        <TitlePage header="Travel">
          <p>
            Showcase of some of the interesting places I've been
          </p>
        </TitlePage>
        
      </div>
      <Footer />
    </div>
  );
}
