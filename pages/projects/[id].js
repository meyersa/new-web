import { useEffect, useState } from "react";
import Header from "../components/Header";
import TitlePage from "../components/TitlePage";
import Footer from "../components/Footer";
import { getAllPostIds, getPostData } from "../../lib/posts";
import AuthorDate from "../components/AuthorDate";
import TextWrap from "../components/TextWrap";
import "prismjs/themes/prism.css";
import "prismjs";
import "prismjs/plugins/autoloader/prism-autoloader.min.js"; // Import the Autoloader plugin

export default function Writeup({ postData }) {
  const [contentHtml, setContentHtml] = useState(postData.contentHtml);
  const [headings, setHeadings] = useState([]);
  const [isClient, setIsClient] = useState(false); // Flag to track client-side rendering

  useEffect(() => {
    setIsClient(true); // Indicate that we are on the client side

    // Display a table of contents at the top of posts
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = postData.contentHtml;

    // Select all <h1> elements and extract text and ID
    const h1Elements = tempDiv.querySelectorAll("h1");
    const tocItems = Array.from(h1Elements).map((heading, index) => {
      let headingId = heading.innerText
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");

      if (tempDiv.querySelectorAll(`#${headingId}`).length > 0) {
        headingId = `${headingId}-${index}`;
      }

      heading.id = headingId;
      return { text: heading.innerText, id: heading.id };
    });

    setHeadings(tocItems);
    setContentHtml(tempDiv.innerHTML);
  }, [postData.contentHtml]);

  // Apply PrismJS syntax highlighting only after component has mounted
  useEffect(() => {
    if (isClient) {
      Prism.highlightAll(); // Apply syntax highlighting
    }
  }, [isClient, contentHtml]);

  return (
    <div>
      <Header />
      <TitlePage header={postData.title} image={postData.image}>
        <AuthorDate author={postData.author} authorImage={postData.authorImage} date={postData.date} />
      </TitlePage>
      <TextWrap>
        <h2>Excerpt</h2>
        <p>{postData.excerpt}</p>
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
        {/* Only render the content after component is mounted */}
        {isClient && (
          <div className="innerHTML" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        )}
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
