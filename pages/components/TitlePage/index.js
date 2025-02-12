import styles from "./titlepage.module.css";
import Image from "next/image";
import defaultImage from "../../../public/images/components/TitlePage/default.svg";
import Width from "../../../styles/Width.module.css";
import SocialLinks from "../SocialLinks";
import Head from "next/head";
import ScrollHelper from "../ScrollHelper";

export default function TitlePage({ header, image, blurDataURL, children }) {
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
        {blurDataURL ? (
          // If there is a blurDataURL
          <Image
            src={image || defaultImage}
            alt="Background image with blur"
            priority={true}
            quality={50}
            height={"500"}
            width={"500"}
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        ) : (
          // If there is not a blurDataURL
          <Image src={image} alt="Background image" priority={true} quality={25} height={"500"} width={"500"} />
        )}
        {children}
        <div className={styles.bottom}>
          <SocialLinks />
          <ScrollHelper />
        </div>
      </div>
    </>
  );
}
