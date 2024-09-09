import Image from "next/image";
import styles from "./fullscreenimage.module.css";

export default function FullScreenImage({ img, alt }) {
  if (img == null) {
    console.error("Image cannot be null");
    return;
  }

  function openImage() {
    console.log("Opening image");

    document.getElementsByTagName("body")[0].style.height = "100dvh";
    document.getElementsByTagName("body")[0].style.overflow = "hidden";

    document.getElementById("show").style.display = "block";
  }

  function closeImage() {
    console.log("Closing image");

    document.getElementsByTagName("body")[0].style.height = "unset";
    document.getElementsByTagName("body")[0].style.overflow = "unset";

    document.getElementById("show").style.display = "none";
  }

  return (
    <div className={styles.invis}>
      <button
        className={styles.invisButton}
        onClick={() => {
          openImage();
        }}
      >
        <Image src={img} height="500" width="500" />
      </button>
      <div id="show" className={styles.wrapper}>
        <div className={styles.flexRight}>
          <button
            className={styles.invisButton}
            onClick={() => {
              closeImage();
            }}
          >
            <i className={"fa-solid fa-rectangle-xmark"}></i>
          </button>
        </div>
        <div className={styles.innerWrapper}>
          <div className={styles.imageWrapper}>
            <Image src={img} height="500" width="500" priority={true} />
            <p>{alt}</p>
          </div>
          <div className={styles.controls}>
            <button className={styles.invisButton}>
              <i className={"fa-solid fa-caret-left"}></i>
            </button>
            <button className={styles.invisButton}>
              <i className={"fa-solid fa-caret-right"}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
