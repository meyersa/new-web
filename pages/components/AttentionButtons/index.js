import AttentionButton from "../AttentionButton";
import styles from "./attentionbuttons.module.css";

export default function AttentionButtons() {

  return (
      <div className={styles.wrapper}>
        <AttentionButton text={"Me"} emphasize={"🙋"} loc="#down" />
        <AttentionButton text={"Projects"} emphasize={"🏗️"} loc="/projects" />
        <AttentionButton text={"Photo"} emphasize={"📸"} loc="/photography" />
      </div>
  );
}
