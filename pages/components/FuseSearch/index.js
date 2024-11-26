import styles from "./fusesearch.module.css";
import Shadow from "../../../styles/Shadow.module.css";
import Fuse from "fuse.js";
import PostItem from "../RecentPostItem";
import { useState } from "react";
import { formatRelative } from "date-fns";

export default function FuseSearch({ data }) {
  if (data == null) {
    throw new Error("Data cannot be null");
  }

  const [searchResults, setSearchResults] = useState([]);

  const fuseOptions = {
    keys: ["title", "date", "content"],
  };

  const fuse = new Fuse(data, fuseOptions);

  function getDate(date) {
    const raw = formatRelative(new Date(date), new Date(), { addSuffix: true });
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  }

  function handleSearch() {
    const searchBox = document.getElementById("searchBox");
    if (!searchBox) return;

    const searchQuery = searchBox.value.trim();
    const results = searchQuery
      ? fuse.search(searchQuery).map(result => result.item)
      : [];

    setSearchResults(results);
  }

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchArea}>

      <h1>Search</h1>
      <p>All posts are indexed by title, date, and content. Powered by Fuse.js</p>
      <form>
        <input
          id="searchBox"
          placeholder="..."
          onInput={() => handleSearch()}
          className={[Shadow.class, styles.searchBox].join(" ")}
        ></input>
      </form>
      </div>
      <div id="searchResults">
        {searchResults.length > 0 && (
          searchResults.map(({ id, type, date, title, excerpt, image }) => (
            <div key={id} style={{ display: "contents" }}>
              <PostItem
                dir={type}
                id={id}
                title={title}
                date={getDate(date)}
                excerpt={excerpt}
                image={image}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}