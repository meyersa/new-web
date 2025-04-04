import Header from "../components/Header";
import TitlePage from "../components/TitlePage";
import Footer from "../components/Footer";
import { getAllPostIds, getPostData } from "../../lib/posts";
import TextWrap from "../components/TextWrap";
import Head from "next/head";
import TextBlock from "../components/TextBlock";
import { getBlurData } from "../../lib/getBlurData";
import FullScreenGallery from "../components/FullScreenImageGallery";

const type = "photography";
export default function Photography({ postData, blurDataURL }) {
  return (
    <>
      <Head>
        <title>{`${postData.title} - August Meyers`}</title>
        <meta name="description" content={postData.excerpt} />
      </Head>
      <Header />
      <TitlePage header={postData.title} image={postData.image} blurDataURL={blurDataURL}>
        <p>{postData.excerpt}</p>
        <p>{postData.date}</p>
      </TitlePage>
      <TextBlock>
        <TextWrap>
          <div className="innerHTML" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </TextWrap>
      </TextBlock>
      <FullScreenGallery />
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: getAllPostIds(type),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
      blurDataURL: await getBlurData(postData.image)
    },
  };
}
