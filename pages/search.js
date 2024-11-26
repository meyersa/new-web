import Header from "./components/Header";
import Footer from "./components/Footer";
import { getRecentPosts } from "../lib/posts";
import FuseSearch from "./components/FuseSearch";

export default function Search({ allPostsData }) {

  return (
    <div>
      <Header />
      <FuseSearch data={allPostsData} />
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      allPostsData: getRecentPosts(),
    },
  };
}
