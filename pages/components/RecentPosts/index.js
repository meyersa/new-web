import PostItem from "../RecentPostItem";
import { formatRelative } from "date-fns";
import { useState, useEffect } from "react";
import styles from "./recentposts.module.css";
import Shadow from "../../../styles/Shadow.module.css";

export default function RecentPosts({ dir, allPostsData, postsPerPage = null, scrollToTop = true, topButtons = true }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageUpdated, setIsPageUpdated] = useState(true);

  // Only scroll on page reload
  useEffect(() => {
    if (isPageUpdated) return;

    setIsPageUpdated(true);
    if (scrollToTop) {
      setTimeout(() => {
        document.getElementById("c")?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  }, [isPageUpdated, scrollToTop]);

  /*
   * Basic checks before processing
   *  - dir should not be invalid
   */
  if (allPostsData == null) {
    console.error("allPostsData cannot be null");
    return;
  }

  // Remove unnecessary text
  allPostsData.forEach((post) => {
    delete post.content;
  });

  // Determine whether pagination is needed, if not then show all
  const isPaginated = postsPerPage != null && postsPerPage < allPostsData.length;
  const totalPages = isPaginated ? Math.ceil(allPostsData.length / postsPerPage) : 1;

  // Calculate the current page's posts
  const startIndex = isPaginated ? (currentPage - 1) * postsPerPage : 0;
  const currentPosts = isPaginated ? allPostsData.slice(startIndex, startIndex + postsPerPage) : allPostsData;

  function getDate(date) {
    const raw = formatRelative(new Date(date), new Date(), { addSuffix: true });

    return raw.charAt(0).toUpperCase() + raw.slice(1);
  }

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
    setIsPageUpdated(false); // Track page updates for reload
  }

  return (
    <div id="c" className={styles.wrapper}>
      {isPaginated && allPostsData.length > 3 && topButtons && (
        <div className={styles.paginatedWrapper}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className={[Shadow.soft, styles.paginatedButton].join(" ")}
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={[Shadow.soft, styles.paginatedButton].join(" ")}
          >
            Next
          </button>
        </div>
      )}
      <div className={styles.recentPostsWrapper}>
        {currentPosts.map(({ id, type, date, title, excerpt, image }, index) => (
          <PostItem dir={type} id={id} key={id} title={title} date={getDate(date)} excerpt={excerpt} image={image} />
        ))}
      </div>
      {isPaginated && (
        <div className={styles.paginatedWrapper}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className={[Shadow.soft, styles.paginatedButton].join(" ")}
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={[Shadow.soft, styles.paginatedButton].join(" ")}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
