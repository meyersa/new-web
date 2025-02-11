import Header from "../components/Header";
import TitlePage from "../components/TitlePage";
import Footer from "../components/Footer";
import { getAllPostIds, getPostData } from "../../lib/posts";
import TextWrap from "../components/TextWrap";
import { getAllPhotos } from "../../lib/photos";
import ImageSwiper from "../components/ImageSwiper";
import Head from "next/head";
import TextBlock from "../components/TextBlock";

const type = "photography";
export default function Photography({ postData, photos }) {
  return (
    <>
      <Head>
        <title>{`${postData.title} - August Meyers`}</title>
        <meta name="description" content={postData.excerpt} />
      </Head>
      <Header />
      <TitlePage header={postData.title} image={postData.image}>
        <p>{postData.excerpt}</p>
        <p>{postData.date}</p>
      </TitlePage>
      <ImageSwiper imageList={photos} />
      <TextBlock>
        <TextWrap>
          <div className="innerHTML" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </TextWrap>
      </TextBlock>
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
  return {
    props: {
      postData: await getPostData(params.id),
      photos: await getAllPhotos(params.id, type),
    },
  };
}
