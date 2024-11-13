import PostItem from "../RecentPostItem";
import { formatRelative } from "date-fns";

export default function RecentPosts({ dir, allPostsData }) {
  /*
   * Basic checks before processing
   *  - dir should not be invalid
   */
  if (allPostsData == null) {
    console.error("allPostsData cannot be null");
    return;
  }

  function getDate(date) {
    const raw = formatRelative(date, new Date(), { addSuffix: true });

    return raw.charAt(0).toUpperCase() + raw.slice(1);
  }

  return (
    <div style={{marginTop: "3rem", marginBottom: "3rem"}}>
      {allPostsData.map(({ id, date, title, exerpt, image }) => (
        <PostItem dir={dir} key={id} id={id} title={title} date={getDate(date)} exerpt={exerpt} image={image} />
      ))}
    </div>
  );
}
