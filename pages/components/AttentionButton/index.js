import styles from "./attentionbutton.module.css";
import Shadow from "../../../styles/Shadow.module.css"

export default function AttentionButton({ text, loc, background }) {
  if (text == null || loc == null) {
    console.error("Colorbox inputs cannot be null");
    return;
    
  }

  if (background == null) {
    background = "/svgs/circuit.svg"
    
  }

  function redirect(loc) {
    window.location.href = loc;

  }

  return (
    <button
      className={[styles.button, Shadow.class].join(" ")}
      style={{ backgroundImage: `url(${background})` }}
      onClick={() => {
        redirect(`${loc}`);
      }}
    >
      {text}
    </button>
  );
}
