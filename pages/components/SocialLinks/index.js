import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./sociallinks.module.css";
import Image from "next/image";
import Link from "next/link";
import { faGithub, faLinkedin, faSquareGithub } from "@fortawesome/free-brands-svg-icons";

export default function SocialLinks() {
  return (
    <div className={styles.wrapper}>
      <Link href="https://github.com/meyersa">
      <FontAwesomeIcon icon={faSquareGithub} className="fa-solid"/>

      </Link>
      <Link href="https://www.linkedin.com/in/august-meyers/">
      <FontAwesomeIcon icon={faLinkedin} className="fa-solid"/>

      </Link>
    </div>
  );
}
