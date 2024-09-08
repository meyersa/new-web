import Link from "next/link";
import styles from "./footer.module.css";
import SpacerDots from "../SpacerDots";
import SocialLinks from "../SocialLinks";

export default function Header() {
  return (
    <div className={styles.outerWrapper}>
      <SpacerDots />
      <SocialLinks />
      <div className={styles.innerWrapper}>
        <p>copyright</p>
        <p className={styles.divider}>|</p>
        <p>
          probably on <Link href="https://github.com/meyersa">github</Link>
        </p>
      </div>
    </div>
  );
}
