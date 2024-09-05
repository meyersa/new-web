import Header from "./components/Header";
import TitlePage from "./components/TitlePage";
import Link from "next/link";
import ColorBox from "./components/ColorBox";
import Footer from "./components/Footer"
import Image from "next/image";
import StyledList from "./components/StyledList"

export default function Projects() {
  return (
    <div>
      <Header />
      <div>
        <TitlePage>
          <Image src="/images/code.png" height="500" width="500" alt="Code view" />
          <h1>Projects</h1>
          <p>Some of the interesting things I've worked on to progress my knowledge of Computer Science and Information Technology</p>
        </TitlePage>
        <StyledList>
            <ColorBox>
                <h1>InstitutionPenguin</h1>
                <p></p>
            </ColorBox>
        </StyledList>
      </div>
      <Footer />
    </div>
  );
}
