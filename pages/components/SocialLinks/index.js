import styles from "./sociallinks.module.css";
import Image from "next/image";
import Link from "next/link";

export default function SocialLinks() {
  return (
    <div className={styles.outsideWrapper}>
        <div className={styles.insideWrapper}>
            <Link href="https://github.com/meyersa">
                <Image src="/images/github.png" height="100" width="100" />
            </Link>
            <Link href="https://www.linkedin.com/in/august-meyers/">
                <Image src="/images/linkedin.png" height="100" width="100" />
            </Link>
        </div>
    </div>
  );
}
