import styles from "./titlepage.module.css";
import SocialLinks from "../SocialLinks";
import Image from "next/image";
import defaultImage from "../../../public/images/components/TitlePage/default.svg";

export default function TitlePage({ header, image, children, socialLinks = true }) {
  if (image == null) {
    image = defaultImage;
  }

  return (
    <div className={styles.wrapper}>
      {header && <h1 className={styles.wrh1}>{header}</h1>}
      {typeof image === "string" ? (
        // Dynamic image
        <Image src={image} alt="Background image" priority quality={50} width={500} height={500} />
      ) : (
        // Static imported image
        <Image src={image || defaultImage} alt="Background image" priority quality={50} placeholder="blur" />
      )}{" "}
      {socialLinks && <SocialLinks />}
      {children}
    </div>
  );
}
