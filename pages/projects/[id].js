import { useEffect, useState } from "react";
import Header from "../components/Header";
import TitlePage from "../components/TitlePage";
import Footer from "../components/Footer";
import { getAllPostIds, getPostData } from "../../lib/posts";
import AuthorDate from "../components/AuthorDate";
import TextWrap from "../components/TextWrap";

export default function Writeup({ postData }) {
  const [contentHtml, setContentHtml] = useState(postData.contentHtml);
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    /*
     * Display a table of contents at the top of posts
     * - Parse HTML from postData to find h1s, and then
     *   go back and add IDs to them
     * - Those IDs are then saved and passed to the nav
     *   to be used for scrolling to them
     */

    // Temp container for parsing HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = postData.contentHtml;

    // Select all <h1> elements and extract text and ID
    const h1Elements = tempDiv.querySelectorAll("h1");
    const tocItems = Array.from(h1Elements).map((heading, index) => {
      // Generate an ID based on the heading text or index
      let headingId = heading.innerText
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");

      // Ensure the ID is unique
      if (tempDiv.querySelectorAll(`#${headingId}`).length > 0) {
        headingId = `${headingId}-${index}`;
      }

      heading.id = headingId;
      return { text: heading.innerText, id: heading.id };
    });

    // Update the state
    setHeadings(tocItems);
    setContentHtml(tempDiv.innerHTML);
  }, [postData.contentHtml]);

  return (
    <div>
      <Header />
      <TitlePage header={postData.title} image={postData.image}>
        <AuthorDate author={postData.author} authorImage={postData.authorImage} date={postData.date} />
      </TitlePage>
      <TextWrap>
        <h2>Excerpt</h2>
        <p>{postData.exerpt}</p>
        <nav>
          <h2>Table of Contents</h2>
          <ul>
            {headings.map((heading) => (
              <li key={heading.id}>
                <a href={`#${heading.id}`}>{heading.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      </TextWrap>
      <TextWrap>
        <div className="innerHTML" dangerouslySetInnerHTML={{ __html: contentHtml }} />
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
