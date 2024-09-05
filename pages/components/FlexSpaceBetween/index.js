import styles from "./flexspacebetween.module.css";

export default function FlexSpaceBetween({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}
