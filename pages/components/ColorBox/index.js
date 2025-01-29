import styles from "./colorbox.module.css";
import Shadow from "../../../styles/Shadow.module.css"

export default function ColorBox({ children }) {

  return (
      <div className={[styles.wrapper, Shadow.hard].join(" ")}>
        {children}
      </div>
  );
}
