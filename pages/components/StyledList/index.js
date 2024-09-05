import styles from "./styledlist.module.css";

export default function StyledList({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}
