import Header from "../components/Header";
import TitlePage from "../components/TitlePage";
import Footer from "../components/Footer";
import { getAllPostIds, getPostData } from "../../lib/posts";
import AuthorDate from "../components/AuthorDate";
import TextWrap from "../components/TextWrap";
import "@wooorm/starry-night/style/both";
import Head from "next/head";

const type = "projects";

export default function Projects({ postData }) {
  return (
    <div>
      <Head>
        <title>{postData.title} - August Meyers</title>
        <meta name="description" content={postData.excerpt} />
      </Head>
      <Header />
      <TitlePage header={postData.title} image={postData.image}>
        <AuthorDate author={postData.author} authorImage={postData.authorImage} date={postData.date} />
      </TitlePage>
      <TextWrap>
        <div className="innerHTML" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </TextWrap>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: getAllPostIds(type),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      postData: await getPostData(params.id),
    },
  };
}
