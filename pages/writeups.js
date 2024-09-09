import Header from "./components/Header";
import TitlePage from "./components/TitlePage";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import ColorBox from "./components/ColorBox";
import Footer from "./components/Footer";
import Image from "next/image";

export default function Writeups({ allPostsData }) {
  return (
    <div>
      <Header />
      <div>
        <TitlePage image={"/images/writeups/code.png"} header={"Writeups"}></TitlePage>
        {allPostsData.map(({ id, date, title, exerpt, author, authorImg, image }, index) => (
          <ColorBox key={id}>
            <h1>
              <Link href={`writeups/${id}`}>{title}</Link>
            </h1>
            <p>{date}</p>
            <Link href={`${id}`}>
              <Image
                src={image}
                alt="Cover image"
                width={500}
                height={500}
                priority={true}
                style={{ width: "100%", height: "10rem" }}
              />
            </Link>
            <p>{exerpt}</p>
          </ColorBox>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  console.log("Fetching post data from writeups");

  const allPostsData = getSortedPostsData("writeups");

  return {
    props: {
      allPostsData,
    },
  };
}
