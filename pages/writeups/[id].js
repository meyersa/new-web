import { useRouter } from "next/router";
import Header from "../components/Header";
import TitlePage from "../components/TitlePage";
import Footer from "../components/Footer";
import Image from "next/image";
import { getAllPostIds, getPostData } from "../../lib/posts";
import ColorBox from "../components/ColorBox";
import AuthorDate from "../components/AuthorDate";
import FlexSpaceBetween from "../components/FlexSpaceBetween";

export default function Writeup({ postData }) {
  const router = useRouter();
  return (
    <div>
      <Header />
      <TitlePage>
        <Image src={postData.image} alt="Cover image" width="500" height="500" priority="True" />
        <h1>{postData.title}</h1>
        <FlexSpaceBetween>
          <AuthorDate author={postData.author} authorImage={postData.authorImage} date={postData.date} />
          <p>{postData.exerpt}</p>
        </FlexSpaceBetween>
      </TitlePage>
      <ColorBox>
        <div className="innerHTML" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </ColorBox>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds("writeups");
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id, "writeups");
  return {
    props: {
      postData,
    },
  };
}
