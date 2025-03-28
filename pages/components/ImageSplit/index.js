import Image from "next/image";
import styles from "./imagesplit.module.css";

export default function ImageSplit({ image, alt, children }) {
  if (image == null) {
    console.error("Image cannot be null");
  }

  if (children == null) {
    console.error("Children cannot be null");
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <Image src={image} height={100} width={100} quality={50} alt={alt} />
      </div>
      <div className={styles.childrenWrapper}>{children}</div>
    </div>
  );
}
