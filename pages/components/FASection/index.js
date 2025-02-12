import styles from "./fasection.module.css";

export default function FASection({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}
