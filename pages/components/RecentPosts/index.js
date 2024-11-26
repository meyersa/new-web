import PostItem from "../RecentPostItem";
import { formatRelative } from "date-fns";
import { useState } from "react";
import styles from "./recentposts.module.css";
import Shadow from "../../../styles/Shadow.module.css"
import SpacerDots from "../SpacerDots";

export default function RecentPosts({ dir, allPostsData, postsPerPage = null }) {
  /*
   * Basic checks before processing
   *  - dir should not be invalid
   */
  if (allPostsData == null) {
    console.error("allPostsData cannot be null");
    return;
  }

  const [currentPage, setCurrentPage] = useState(1);

  // Determine whether pagination is needed, if not then show all
  const isPaginated = postsPerPage != null;
  const totalPages = isPaginated ? Math.ceil(allPostsData.length / postsPerPage) : 1;

  // Calculate the current page's posts
  const startIndex = isPaginated ? (currentPage - 1) * postsPerPage : 0;
  const currentPosts = isPaginated ? allPostsData.slice(startIndex, startIndex + postsPerPage) : allPostsData;

  function getDate(date) {
    const raw = formatRelative(new Date(date), new Date(), { addSuffix: true });

    return raw.charAt(0).toUpperCase() + raw.slice(1);
  }

  return (
    <div className={styles.wrapper}>
      {currentPosts.map(({ id, date, title, excerpt, image }, index) => (
        <div key={id} style={{display: "contents"}}>
          <PostItem dir={dir} id={id} title={title} date={getDate(date)} excerpt={excerpt} image={image} />
          {index !== currentPosts.length - 1 && <SpacerDots />}
        </div>
      ))}
      {isPaginated && (
        <div className={styles.paginatedWrapper}>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className={[Shadow.class, styles.paginatedButton].join(" ")}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={[Shadow.class, styles.paginatedButton].join(" ")}
          >
            Next
          </button>
        </div>
      )}
      <SpacerDots />
    </div>
  );
}
