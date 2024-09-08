import styles from "./imagesplit.module.css";
import Image from "next/image";

export default function ImageSplit({ image, alt, children }) {
    if (image == null) {
        console.error("Image cannot be null")

    }

    if (children == null) {
        console.error("Children cannot be null")

    }

    return (
        <div className={styles.wrapper}>
            <Image src={image} height="500" width="500" alt={alt}/>
            <div className={styles.childrenWrapper}>
                {children}
            </div>
        </div>
    );
}
