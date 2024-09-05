import styles from "./colorbox.module.css";

export default function ColorBox({ children }) {

  return (
      <div className={styles.wrapper}>
        {children}
      </div>
  );
}
