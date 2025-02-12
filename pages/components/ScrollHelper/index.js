import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default function ScrollHelper() {
  function scrollDown() {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  }

  return <FontAwesomeIcon icon={faCaretDown} onClick={scrollDown} className="fa-solid fa-bounce" style={{color: "var(--contrast)"}} />;
}
