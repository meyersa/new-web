import styles from "./fasection.module.css";

export default function FATitle({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}
