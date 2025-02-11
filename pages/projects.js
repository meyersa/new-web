import Header from "./components/Header";
import TitlePage from "./components/TitlePage";
import { getRecentPosts } from "../lib/posts";
import Footer from "./components/Footer";
import RecentPosts from "./components/RecentPosts";
import TextBlock from "./components/TextBlock";
import Link from "next/link";
import Head from "next/head";
import SmallBox from "./components/SmallBox";
import PageBlock from "./components/PageBlock";

const type = "projects";

export default function Projects({ allPostsData }) {
  return (
    <>
      <Head>
        <title>Projects - August Meyers</title>
        <meta
          name="description"
          content="Things I've tackled in computer science and information technology to improve my knowledge"
        />
      </Head>
      <Header />
      <TitlePage image={"/images/projects/background.webp"} header={"Projects"}>
        <p>Things I&apos;ve tackled in computer science and information technology to improve my knowledge</p>
      </TitlePage>
      <TextBlock>
        <PageBlock>
          <h2>Recent Posts</h2>
          <RecentPosts dir={type} allPostsData={allPostsData} postsPerPage={5} topButtons={false} />
          <SmallBox>
            <p>
              If you are interested in more of what I have worked on, check out my{" "}
              <Link href="https://github.com/meyersa">github</Link>. There are a lot of other things I haven&apos;t
              taken the time to write about on there
            </p>
          </SmallBox>
        </PageBlock>
      </TextBlock>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      allPostsData: getRecentPosts({ type }),
    },
  };
}
