import Header from "../components/Header";
import TitlePage from "../components/TitlePage";
import Footer from "../components/Footer";
import { getAllPostIds, getPostData } from "../../lib/posts";
import TextWrap from "../components/TextWrap";
import "@wooorm/starry-night/style/dark";
import Head from "next/head";
import TextBlock from "../components/TextBlock";
import FASection from "../components/FASection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import { faCalendar, faComment, faExternalLink } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getBlurData } from "../../lib/getBlurData";
import PageBlock from "../components/PageBlock";

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
        <p>
          <FontAwesomeIcon
            icon={faCalendar}
            className="fa-solid"
            style={{ fontSize: "var(--small-font)", color: "var(--contrast)" }}
          />{" "}
          {postData.excerpt}
        </p>
        <p>
          <FontAwesomeIcon
            icon={faComment}
            className="fa-solid"
            style={{ fontSize: "var(--small-font)", color: "var(--contrast)" }}
          />{" "}
          {postData.date}
        </p>
      </TitlePage>
      <TextBlock>
        {postData.github || postData.demo ? (
          <div>
            {postData.github ? (
              <FASection>
                <Link href={postData.github}>
                  <FontAwesomeIcon icon={faGithubAlt} className="fa-solid fa-fw" style={{ color: "var(--contrast)" }} />
                </Link>
                <p>
                  Check out the source code on <Link href={postData.github}>Github</Link>
                </p>
              </FASection>
            ) : null}
            {postData.demo ? (
              <FASection>
                <Link href={postData.demo}>
                  <FontAwesomeIcon
                    icon={faExternalLink}
                    className="fa-solid fa-fw"
                    style={{ color: "var(--contrast)" }}
                  />
                </Link>
                <p>
                  Check out the <Link href={postData.demo}>Demo</Link>
                </p>
              </FASection>
            ) : null}
          </div>
        ) : null}
        <PageBlock>
          <TextWrap>
            <div className="innerHTML" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          </TextWrap>
        </PageBlock>
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
  const postData = await getPostData(params.id);

  return {
    props: {
      postData: postData,
      blurDataURL: await getBlurData(postData.image),
    },
  };
}
