import Header from "../components/Header";
import TitlePage from "../components/TitlePage";
import Footer from "../components/Footer";
import { getAllPostIds, getPostData } from "../../lib/posts";
import AuthorDate from "../components/AuthorDate";
import TextWrap from "../components/TextWrap";
import { getAllPhotos } from "../../lib/photos";
import ImageCarousel from "../components/ImageCarousel";
export default function Writeup({ postData, photos }) {  
  return (
    <div>
      <Header />
      <TitlePage header={postData.title} image={postData.image}>
        <AuthorDate author={postData.author} authorImage={postData.authorImage} date={postData.date} />
      </TitlePage>
      <ImageCarousel imageList={photos} />
      <TextWrap>
        <div className="innerHTML" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </TextWrap>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds("photography");
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id, "photography");
  const photos = await getAllPhotos(params.id, "photography");
  
  return {
    props: {
      postData,
      photos
    },
  };
}
