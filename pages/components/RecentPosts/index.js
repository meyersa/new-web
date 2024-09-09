import PostItem from "../RecentPostItem"

export default function RecentPosts({ dir, allPostsData }) {
    /*
     * Basic checks before processing
     *  - dir should not be invalid
     */
    if (allPostsData == null) {
        console.error("allPostsData cannot be null")
        return

    }

    return (
        <div>
        {allPostsData.map(({ id, date, title, exerpt, image }) => (
          <PostItem 
            dir={dir}
            key={id} 
            id={id} 
            title={title} 
            date={date} 
            exerpt={exerpt} 
            image={image} 
          />
        ))}
      </div>
    );
}