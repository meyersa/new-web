import styles from "./smallbox.module.css";
import SpacerDots from "../SpacerDots";

export default function SmallBox({ children }) {

  return (
      <div className={styles.wrapper}>
        <SpacerDots />
        {children}
        <SpacerDots />
      </div>
  );
}
