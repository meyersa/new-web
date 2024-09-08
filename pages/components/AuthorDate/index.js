import styles from "./authordate.module.css";
import Image from "next/image";

export default function AuthorDate({ author, authorImage, date }) {
  if (author == null) {
    author = "August Meyers";
    authorImage = "/images/home/selfie.jpeg";
    
  } else if (authorImage == null) {
    authorImage = "/images/components/AuthorDate/defaultAuthor.png";

  }

  return (
    <div className={styles.wrapper}>
      <Image src={authorImage} width="500" height="500" alt="Image of author" />
      <div>
        <p>{author}</p>
        <p>{date}</p>
      </div>
    </div>
  );
}
