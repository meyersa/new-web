import Header from "./components/Header";
import TitlePage from "./components/TitlePage";
import { getSortedPostsData } from "../lib/posts";
import Footer from "./components/Footer";
import RecentPosts from "./components/RecentPosts";
import TextWrap from "./components/TextWrap";
import SpacerDots from "./components/SpacerDots";
import Link from "next/link";

const dir = "projects";
export default function Projects({ allPostsData }) {
  return (
    <div>
      <Header />
      <div>
        <TitlePage image={"/images/projects/background.webp"} header={"Projects"}>
          <p>
            Things I&apos;ve tackled in computer science and information technology that aren&apos;t as representable as
            a &quot;project&quot;
          </p>
        </TitlePage>
        <TextWrap>
          <h1 style={{ textAlign: "center" }}>Recent</h1>
          <SpacerDots />
        </TextWrap>
        <RecentPosts dir={dir} allPostsData={allPostsData} />
        <TextWrap>
          <p style={{ textAlign: "center" }}>
            If you are interested in more of what I have worked on, check out my{" "}
            <Link href="https://github.com/meyersa">github</Link>. There are a lot of other things I haven&apos;t taken the
            time to write about on there
          </p>
        </TextWrap>
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  console.log(`Fetching post data from ${dir}`);

  const allPostsData = getSortedPostsData(dir);

  return {
    props: {
      allPostsData,
    },
  };
}
