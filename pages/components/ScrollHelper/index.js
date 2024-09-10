import styles from "./scrollhelper.module.css";
import { useState, useEffect, useRef } from "react";

export default function ScrollHelper() {
  const [pointDown, setDown] = useState(true);
  const tRef = useRef(null);

  function scrollUp() {
    window.location.href = `#t`;
  }

  function scrollDown() {
    window.location.href = `#c`;
  }

  function scroll() {
    pointDown ? scrollDown() : scrollUp();
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setDown(true);
        } else {
          console.log("Not intersecting");
          setDown(false);
        }
      });
    });

    if (tRef.current) {
      observer.observe(tRef.current);
    }

    return () => {
      if (tRef.current) {
        observer.unobserve(tRef.current);
      }
    };
  }, []);

  return (
    <div style={{ display: "contents" }}>
      <div id="t" className={styles.top} ref={tRef} />
      <div id="c" className={styles.content} />
      <div className={styles.wrapper} onClick={() => scroll()}>
        <i
          className="fa-solid fa-caret-down"
          style={{ transform: `rotate(${pointDown ? 0 : 180}deg)`, transition: "transform 1s ease" }}
        ></i>
      </div>
    </div>
  );
}
