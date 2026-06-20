import Header from "./components/Header";
import TitlePage from "./components/TitlePage";
import Footer from "./components/Footer";
import { getRecentPosts } from "../lib/posts";
import RecentPosts from "./components/RecentPosts";
import Head from "next/head";
import TextBlock from "./components/TextBlock";
import PageBlock from "./components/PageBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faCameraRetro,
  faMagnifyingGlass,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import FASection from "./components/FASection";
import { getBlurData } from "../lib/getBlurData";

const type = "photography";
const titleImage = "/images/photography/background.jpg";

export default function Photography({ allPostsData, blurDataURL }) {
  return (
    <>
      <Head>
        <title>Photography - August Meyers</title>
        <meta name="description" content="Showcase of one of my main hobbies - Photography" />
      </Head>
      <Header />
      <TitlePage header="Photography" image={titleImage} blurDataURL={blurDataURL}>
        <p>Showcase of one of my main hobbies - Photography</p>
      </TitlePage>
      <TextBlock>
        <PageBlock>
          <div>
            <h2>Trips, Portraits, Sports, and more</h2>
            <p>
              On this page are my favorite collections of photos, mostly of trips I&apos;ve been on,
              but also including some sports photography.
            </p>
          </div>
        </PageBlock>
        <PageBlock>
          <div>
          <h2>Recent Posts</h2>
          <RecentPosts dir={type} allPostsData={allPostsData} postsPerPage={5} />
          </div>

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
      blurDataURL: await getBlurData(titleImage),
    },
  };
}
