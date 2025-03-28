import styles from "./titlepage.module.css";
import defaultImage from "../../../public/images/components/TitlePage/default.svg";
import Width from "../../../styles/Width.module.css";
import SocialLinks from "../SocialLinks";
import Head from "next/head";
import ScrollHelper from "../ScrollHelper";
import ImageLoader from "../ImageLoader";

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
        <ImageLoader
          src={image || defaultImage}
          alt="Background image with blur"
          height={2000}
          width={2000}
          priority={true}
          blurUrl={blurDataURL}
          quality={50}
        />
        {children}
        <div className={styles.bottom}>
          <SocialLinks />
          <ScrollHelper />
        </div>
      </div>
    </>
  );
}
