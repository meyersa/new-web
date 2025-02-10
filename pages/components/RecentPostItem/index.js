import Link from "next/link";
import Image from "next/image";
import styles from "./recentpostitem.module.css";

export default function PostItem({ dir, id, title, date, excerpt, image }) {
  if (dir == null) {
    console.error("DIR cannot be null");
    return;
  }

  return (
    <div key={id} className={styles.wrapper} onClick={() => (window.location.href = `${dir}/${id}`)}>
      <div className={styles.text}>
        <h3>{title}</h3>
        <p>{date}</p>
        <p>{excerpt}</p>
      </div>
        <Image src={image} alt="Cover image" width={250} height={250} />
    </div>
  );
}
