import styles from "./attentionbutton.module.css";
import Shadow from "../../../styles/Shadow.module.css"

export default function AttentionButton({ text, loc, emphasize }) {
  if (text == null || loc == null) {
    console.error("Colorbox inputs cannot be null");
    return;
    
  }

  function redirect(loc) {
    window.location.href = loc;

  }

  return (
    <button
      className={[styles.button, Shadow.class].join(" ")}
      onClick={() => {
        redirect(`${loc}`);
      }}
    >
      {text}
      <span className={styles.emphasize}>{emphasize}</span>
    </button>
  );
}
