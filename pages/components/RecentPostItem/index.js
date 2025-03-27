import styles from "./recentpostitem.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faComment } from "@fortawesome/free-solid-svg-icons";
import ImageLoader from "../ImageLoader";

export default function PostItem({ dir, id, title, date, excerpt, image }) {
  if (dir == null) {
    console.error("DIR cannot be null");
    return;
  }

  return (
    <Link href={`${dir}/${id}`} passHref style={{textDecoration: "none", color: "inherit"}}>
      <div className={styles.wrapper} onClick={() => (window.location.href = `${dir}/${id}`)}>
        <div className={styles.text}>
          <h3>{title}</h3>
          <p><FontAwesomeIcon icon={faCalendar} className="fa-solid" /> {date}</p>
          <p><FontAwesomeIcon icon={faComment} className="fa-solid" /> {excerpt}</p>
        </div>
        <ImageLoader src={image} alt="Cover image" width={250} height={250} quality={50}/>
      </div>
    </Link>
  );
}
