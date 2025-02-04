import styles from "./sociallinks.module.css";
import Image from "next/image";
import Link from "next/link";

export default function SocialLinks() {
  return (
    <div className={styles.wrapper}>
      <Link href="https://github.com/meyersa">
        <Image
          src="/images/components/SocialLinks/github.webp"
          height="100"
          width="100"
          alt="Github"
        />
      </Link>
      <Link href="https://www.linkedin.com/in/august-meyers/">
        <Image
          src="/images/components/SocialLinks/linkedin.webp"
          height="100"
          width="100"
          alt="LinkedIn"
        />
      </Link>
    </div>
  );
}
