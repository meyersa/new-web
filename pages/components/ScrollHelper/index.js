import styles from "./scrollhelper.module.css";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";

export default function ScrollHelper() {
  const [pointDown, setDown] = useState(true);
  const tRef = useRef(null);

  function scrollUp() {
    window.location.href = `#`;
  }

  function scrollDown() {
    window.location.href = `#c`;
  }

  function scroll() {
    pointDown ? scrollDown() : scrollUp();
  }

  useEffect(() => {
    // Listen for scroll events
    window.addEventListener("scroll", () => {
      setDown(window.scrollY === 0);
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ display: "contents" }}>
      <div id="c" className={styles.content} />
      <div className={styles.wrapper} onClick={() => scroll()}>
        <FontAwesomeIcon
          icon={faSortDown}
          className="fa-solid"
          style={{ transform: `rotate(${pointDown ? 0 : 180}deg)`, transition: "transform 1s ease" }}
        />
      </div>
    </div>
  );
}
