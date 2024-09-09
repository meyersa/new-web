import AttentionButton from "../AttentionButton";
import styles from "./attentionbuttons.module.css";

export default function AttentionButtons() {

  return (
      <div className={styles.wrapper}>
        <AttentionButton text={"Scroll"} loc="#down" background={"/images/writeups/code.png"}/>
        <AttentionButton text={"Projects"} loc="/projects" />
        <AttentionButton text={"Writeups"} loc="/writeups" />
        <AttentionButton text={"Photography"} loc="/Photography" />
      </div>
  );
}
