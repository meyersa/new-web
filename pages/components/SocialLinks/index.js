import styles from "./sociallinks.module.css";
import Image from "next/image";
import Link from "next/link";

export default function SocialLinks() {
  return (
    <div className={styles.wrapper}>
            <Link href="https://github.com/meyersa">
                <Image src="/images/github.webp" height="100" width="100" />
            </Link>
            <Link href="https://www.linkedin.com/in/august-meyers/">
                <Image src="/images/linkedin.webp" height="100" width="100" />
            </Link>
    </div>
  );
}
