import AttentionButton from "../AttentionButton";
import styles from "./attentionbuttons.module.css";

export default function AttentionButtons() {

  return (
      <div className={styles.wrapper}>
        <AttentionButton text={"Scroll"} loc="#down" background={"/images/writeups/code.png"} />
        <AttentionButton text={"Projects"} loc="/projects" background={"/images/writeups/code.png"} />
        <AttentionButton text={"Writeups"} loc="/writeups" background={"/images/writeups/code.png"} />
        <AttentionButton text={"Photo"} loc="/photography" background={"/images/photography/background.jpg"} />
      </div>
  );
}
