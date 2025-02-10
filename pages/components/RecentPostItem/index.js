import Link from "next/link";
import Image from "next/image";
import styles from "./recentpostitem.module.css";

export default function PostItem({ dir, id, title, date, excerpt, image }) {
  if (dir == null) {
    console.error("DIR cannot be null");
    return;
  }

  return (
      <div key={id} className={styles.wrapper}>
        <div className={styles.text}>
          <h2>
            <Link href={`${dir}/${id}`}>{title}</Link>
          </h2>
          <p>{date}</p>
          <p>{excerpt}</p>
        </div>
        <div className={styles.img}>
          <Link href={`${dir}/${id}`}>
            <Image
              src={image}
              alt="Cover image"
              width={250}
              height={250}
            />
          </Link>
        </div>
      </div>
  );
}
