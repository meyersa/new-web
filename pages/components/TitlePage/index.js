import styles from "./titlepage.module.css";
import defaultImage from "../../../public/images/components/TitlePage/default.svg";
import Width from "../../../styles/Width.module.css";
import SocialLinks from "../SocialLinks";
import Head from "next/head";
import ScrollHelper from "../ScrollHelper";
import Image from "next/image";

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
          <Image
            src={image || defaultImage}
            alt="Background image with blur"
            height={2000}
            width={2000}
            priority={true}
            placeholder="blur"
            blurDataURL={blurDataURL}
            quality={50}
          />
        ) : (
          <Image
            src={image || defaultImage}
            alt="Background image with blur"
            height={2000}
            width={2000}
            priority={true}
            quality={50}
          />
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
