/*
 * Content Section for defining width of text
 */
import styles from "./textblock.module.css";
import Width from "../../../styles/Width.module.css";

export default function TextBlock({ children }) {
  return <main className={`${Width.default} ${styles.wrapper}`}>{children}</main>;
}
