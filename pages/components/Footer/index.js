import Link from "next/link";
import styles from "./footer.module.css";
import SocialLinks from "../SocialLinks";

export default function Footer() {
  return (
    <div className={styles.wrapper}>
      <SocialLinks />
      <div className={styles.innerWrapper}>
        <p>&copy; August Meyers {new Date().getFullYear()}</p>
        <p className={styles.divider}>|</p>
        <p>
          <Link href="https://github.com/meyersa/new-web">Source</Link>
        </p>
      </div>
    </div>
  );
}
