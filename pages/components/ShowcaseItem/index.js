/*
 * Showcase Item
 * Allows for having an image be wrapped into a box
 */
import styles from "./showcaseitem.module.css";
import Shadow from "../../../styles/Shadow.module.css"

export default function ShowcaseItem({ children }) {
  return <div className={`${styles.showcaseWrapper} ${Shadow.soft}`}>{children}</div>;
}