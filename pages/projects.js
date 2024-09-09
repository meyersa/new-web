import Header from "./components/Header";
import TitlePage from "./components/TitlePage";
import Link from "next/link";
import ColorBox from "./components/ColorBox";
import Footer from "./components/Footer";
import Image from "next/image";
import StyledList from "./components/StyledList";

export default function Projects() {
  return (
    <div>
      <Header />
      <div>
        <TitlePage header="Projects">
          <p>
            Some of the interesting things I've worked on to progress my knowledge of Computer Science and Information
            Technology
          </p>
        </TitlePage>
        <StyledList>
          <ColorBox>
            <h1>InstitutionPenguin</h1>
            <p>
              Senior design project involving agile programming, React native web display, API ready development,
              backend on NoSQL, and a full CI/CD pipeline with automated testing and deployment. You can access the live
              web page <Link href="https://institutionpenguin.com">here</Link> and the source code on Github{" "}
              <Link href="https://github.com/meyersa/institution-penguin">here</Link>.
            </p>
            <h3>Technology</h3>
            <p>NodeJS</p>
            <p>NextJS</p>
            <p>MongoDB</p>
            <p>Github/Actions</p>
            <p>Cypress</p>
            <p>Docker</p>
            <p>NextAuth</p>
          </ColorBox>
          <ColorBox>
            <h1>ShodanETL</h1>
            <p>
              My first attempt at an ETL pipeline. It uses Shodan.io's APIs to gather information about previous scrapes
              to build a dashboard on Django to display the information. Information goes through a Kafka topic between
              parts to ensure connectivity between components. You can find the live dashboard{" "}
              <Link href="https://shodanetl.meyersa.com">here</Link> and the source code on Github{" "}
              <Link href="https://github.com/meyersa/shodan-etl">here</Link>.
            </p>
            <h3>Technology</h3>
            <p>Python</p>
            <p>Kafka</p>
            <p>ExpresJS</p>
            <p>MongoDB</p>
            <p>Docker</p>
          </ColorBox>
          <ColorBox>
            <h1>Small Eats (AWS Flask)</h1>
            <p>A flask website used to showcase templating and dynamic deployment onto ec2 for ITC466. You can visit the live website <Link href="https://smalleats.meyersa.com">here</Link> or find the source code <Link href="https://github.com/meyersa/aws-flask">here</Link>.</p>
            <h3>Technology</h3>
            <p>Python</p>
            <p>Flask</p>
            <p>Jinja2</p>
            <p>Docker</p>
          </ColorBox>
        </StyledList>
      </div>
      <Footer />
    </div>
  );
}
