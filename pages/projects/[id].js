import Header from "../components/Header";
import TitlePage from "../components/TitlePage";
import Footer from "../components/Footer";
import { getAllPostIds, getPostData } from "../../lib/posts";
import TextWrap from "../components/TextWrap";
import "@wooorm/starry-night/style/dark";
import Head from "next/head";
import TextBlock from "../components/TextBlock";
import ShowcaseItem from "../components/ShowcaseItem";
import FASection from "../components/FASection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getBlurData } from "../../lib/getBlurData";

const type = "projects";

export default function Projects({ postData, blurDataURL }) {
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
        {postData.github || postData.demo ? (
          <ShowcaseItem>
            <h3>Links</h3>
            {postData.github ? (
              <FASection>
                <FontAwesomeIcon icon={faGithubAlt} />
                <p>
                  Check out the source code on <Link href={postData.github}>Github</Link>
                </p>
              </FASection>
            ) : null}
            {postData.demo ? (
              <FASection>
                <FontAwesomeIcon icon={faLink} />
                <p>
                  Check out the <Link href={postData.demo}>Demo</Link>
                </p>
              </FASection>
            ) : null}
          </ShowcaseItem>
        ) : null}
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
  const postData =  await getPostData(params.id); 

  return {
    props: {
      postData: postData,
      blurDataURL: await getBlurData(postData.image)
    },
  };
}
