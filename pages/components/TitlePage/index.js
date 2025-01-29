import styles from "./titlepage.module.css";
import SocialLinks from "../SocialLinks";
import Image from "next/image";

export default function TitlePage({ header, image, children, socialLinks = true }) {
  if (image == null) {
    image = "/images/components/TitlePage/default.svg";
  }

  return (
    <div className={styles.wrapper}>
      {header && <h1 className={styles.wrh1}>{header}</h1>}
      <Image src={image} alt="Background image" height="500" width="500" priority={true} />
      {socialLinks && <SocialLinks />}
      {children}
    </div>
  );
}
