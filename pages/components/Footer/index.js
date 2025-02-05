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
        <p>&copy; August Meyers {new Date().getFullYear()}</p>
        <p className={styles.divider}>|</p>
        <p>
          <Link href="https://github.com/meyersa/new-web">Source</Link>
        </p>
      </div>
    </div>
  );
}
