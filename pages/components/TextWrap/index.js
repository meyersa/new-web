/*
 * Text wrap for blog posts
 */
import styles from "./textwrap.module.css";

export default function TextWrap({ children }) {
  return <div className={styles.wrapper}>{children}</div>;

}
