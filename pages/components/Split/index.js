/* 
 * Two Column Split Box using CSS grid
 */
import styles from "./split.module.css"

export default function Split({ children }) {

    return (
        <div className={styles.splitWrapper}>
          {children}
        </div>
    );
  }
  