import styles from "./colorbox.module.css";
import HardShadow from "../../../styles/HardShadow.module.css"

export default function ColorBox({ children }) {

  return (
      <div className={[styles.wrapper, HardShadow.class].join(" ")}>
        {children}
      </div>
  );
}
