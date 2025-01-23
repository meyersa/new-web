import styles from "./smallbox.module.css";
import SpacerDots from "../SpacerDots";
import TextWrap from "../TextWrap";

export default function SmallBox({ children }) {
  return (
    <TextWrap>

    <div className={styles.wrapper}>
        <SpacerDots />
        {children}
        <SpacerDots />
    </div>
    </TextWrap>

  );
}
