import Link from "next/link";
import Image from "next/image";
import styles from "./imagecarousel.module.css";
import { useRouter } from "next/router";
import FullScreenImage from "../FullScreenImage"
import { useRef } from "react";

export default function ImageCarousel( {imageList} ) {
  const router = useRouter() 
  const path = router.asPath

  if (imageList == null) {
    console.error("Image list cannot be null")
    return 
    
  }

  return (
    <div className={styles.wrapper}>
      {imageList.map(image => (
        <FullScreenImage img={image} alt="High" key={image} />
      ))}
    </div>
  );
}
