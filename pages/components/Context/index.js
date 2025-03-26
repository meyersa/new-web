import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./context.module.css";
import { faComment } from "@fortawesome/free-regular-svg-icons";

export default function Context({ children }) {
  return (
    <div className={styles.wrapper}>
      <FontAwesomeIcon icon={faComment} className="fa-regular fa-flip-horizontal" />
      <div className={styles.divider} />
      <div className={styles.wrapperInner}>{children}</div>
    </div>
  );
}
