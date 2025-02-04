import Header from "../components/Header";
import TitlePage from "../components/TitlePage";
import Footer from "../components/Footer";
import { getAllPostIds, getPostData } from "../../lib/posts";
import AuthorDate from "../components/AuthorDate";
import TextWrap from "../components/TextWrap";
import { getAllPhotos } from "../../lib/photos";
import ImageSwiper from "../components/ImageSwiper";
import Head from "next/head";

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
        <AuthorDate
          author={postData.author}
          authorImage={postData.authorImage}
          date={postData.date}
        />
      </TitlePage>
      <ImageSwiper imageList={photos} />
      <TextWrap>
        <div className="innerHTML" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </TextWrap>
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
