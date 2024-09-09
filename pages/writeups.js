import Header from "./components/Header";
import TitlePage from "./components/TitlePage";
import { getSortedPostsData } from "../lib/posts";
import Footer from "./components/Footer";
import RecentPosts from "./components/RecentPosts";
import TextWrap from "./components/TextWrap";
import SpacerDots from "./components/SpacerDots";

const dir = "writeups"
export default function Writeups({ allPostsData }) {
  return (
    <div>
      <Header />
      <div>
        <TitlePage image={"/images/writeups/code.png"} header={"Writeups"}>
          <p>Things I've tackled in computer science and information technology that aren't as representable as a "project"</p>
        </TitlePage>
        <TextWrap>
          <h1 style={{textAlign: "center"}}>Recent posts</h1>
          <SpacerDots />
        </TextWrap>
        <RecentPosts dir={dir} allPostsData={allPostsData} />
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
