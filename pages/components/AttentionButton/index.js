import styles from "./attentionbutton.module.css";

export default function AttentionButton({ text, loc, background }) {
  if (text == null || loc == null) {
    console.error("Colorbox inputs cannot be null");
    return;
  }

  function redirect(loc) {
    window.location.href = loc;
  }

  return (
    <button
      className={styles.button}
      style={{ backgroundImage: `url(${background})` }}
      onClick={() => {
        redirect(`${loc}`);
      }}
    >
      {text}
    </button>
  );
}
