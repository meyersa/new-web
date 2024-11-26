import styles from "./fusesearch.module.css";
import Shadow from "../../../styles/Shadow.module.css";
import Fuse from "fuse.js";
import PostItem from "../RecentPostItem";
import { useState } from "react";
import { formatRelative } from "date-fns";

export default function FuseSearch({ data }) {
  if (!data) throw new Error("Data cannot be null");

  const [searchResults, setSearchResults] = useState([]);

  const fuse = new Fuse(data, {
    keys: ["title", "date", "content"],
  });

  const handleSearch = () => {
    const query = document.getElementById("searchBox")?.value.trim();
    setSearchResults(query ? fuse.search(query).map(result => result.item) : []);
  };

  const formatDate = (date) =>
    formatRelative(new Date(date), new Date(), { addSuffix: true });

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchArea}>
        <h1>Search</h1>
        <p>All posts are indexed by title, date, and content. Powered by Fuse.js</p>
        <input
          id="searchBox"
          placeholder="Search..."
          onInput={handleSearch}
          className={`${Shadow.class} ${styles.searchBox}`}
        />
      </div>
      <div id="searchResults">
        {searchResults.length > 0 ? (
          searchResults.map(({ id, type, date, title, excerpt, image }) => (
            <PostItem
              key={id}
              dir={type}
              id={id}
              title={title}
              date={formatDate(date)}
              excerpt={excerpt}
              image={image}
            />
          ))
        ) : (
          <div className={styles.noResults}>
            <p>No results yet</p>
          </div>
        )}
      </div>
    </div>
  );
}