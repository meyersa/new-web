import AttentionButton from "../AttentionButton";
import styles from "./attentionbuttons.module.css";

export default function AttentionButtons() {

  return (
      <div className={styles.wrapper}>
        <AttentionButton text={"Me"} loc="#down" />
        <AttentionButton text={"Projects"} loc="/projects" background={"/images/projects/code.png"} />
        <AttentionButton text={"Photo"} loc="/photography" background={"/images/photography/background.jpg"} />
        <AttentionButton text={"Travel"} loc="/travel" />
      </div>
  );
}
