import styles from "./imagesplit.module.css";
import Image from "next/image";

export default function ImageSplit({ image, alt, children }) {
    if (image == null) {
        throw new Error("Image cannot be null")

    }

    if (children == null) {
        throw new Error("Children cannot be null")

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
