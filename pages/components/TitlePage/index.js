import styles from "./titlepage.module.css";
import SocialLinks from "../SocialLinks"
import Image from "next/image";
import Shadow from "../../../styles/Shadow.module.css"

export default function TitlePage({ header, image, children }) {
  if (header == null) {
    console.error("Header for title cannot be null")
    return 

  }

  if (image == null) {
    image = "/images/components/TitlePage/default.svg"

  }

  return (
    <div className={styles.wrapper}>
      <h1 className={[styles.wrh1, Shadow.class].join(" ")}>{header}</h1>
      <Image src={image} alt="Background image" height="500" width="500" priority={true}  />
      <SocialLinks />

      {children}
    </div>
  );
}
