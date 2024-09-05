import styles from "./titlepage.module.css";

export default function TitlePage({ children }) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
}
