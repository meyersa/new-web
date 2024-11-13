import Link from "next/link";
import Image from "next/image";
import ColorBox from "../ColorBox";
import SpacerDots from "../SpacerDots";
import styles from "./recentpostitem.module.css";

export default function PostItem({ dir, id, title, date, exerpt, image }) {
  if (dir == null) {
    console.error("DIR cannot be null");
    return;
  }

  return (
    <div className={styles.contents}>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          <h1>
            <Link href={`${dir}/${id}`}>{title}</Link>
          </h1>
          <p>{date}</p>
          <p>{exerpt}</p>
        </div>
        <div className={styles.target}>
          <ColorBox>
            <Link href={`${dir}/${id}`}>
              <Image
                src={image}
                alt="Cover image"
                width={500}
                height={500}
                priority={true}
                style={{ width: "100%", height: "30vh", objectFit: "cover" }}
              />
            </Link>
          </ColorBox>
        </div>
      </div>
      <SpacerDots />
    </div>
  );
}
