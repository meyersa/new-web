import styles from "./titlepage.module.css";
import Image from "next/image";
import defaultImage from "../../../public/images/components/TitlePage/default.svg";
import Width from "../../../styles/Width.module.css";
import SocialLinks from "../SocialLinks";
import Head from "next/head";

export default function TitlePage({ header, image, children }) {
  if (image == null) {
    image = defaultImage.src;
  }

  return (
    <>
      <Head>
        <meta property="og:image" content={image} />
      </Head>
      <div className={`${styles.wrapper} ${Width.default}`}>
        {header && <h1 className={styles.wrh1}>{header}</h1>}
        {typeof image === "string" ? (
          // Dynamic image
          <Image src={image} alt="Background image" priority={true} quality={25} height={"500"} width={"500"} />
        ) : (
          // Static imported image
          <Image
            src={image || defaultImage}
            alt="Background image"
            priority={true}
            quality={25}
            height={"500"}
            width={"500"}
            placeholder="blur"
          />
        )}{" "}
        {children}
        <SocialLinks />
      </div>
    </>
  );
}
