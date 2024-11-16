import { useEffect, useState } from "react";
import Header from "../components/Header";
import TitlePage from "../components/TitlePage";
import Footer from "../components/Footer";
import { getAllPostIds, getPostData } from "../../lib/posts";
import AuthorDate from "../components/AuthorDate";
import TextWrap from "../components/TextWrap";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs";
import "prismjs/plugins/autoloader/prism-autoloader.min.js";

export default function Writeup({ postData }) {
  return (
    <div>
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
  const paths = getAllPostIds("projects");
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id, "projects");
  return {
    props: {
      postData,
    },
  };
}
