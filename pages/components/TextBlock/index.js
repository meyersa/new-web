/* 
 * Content Section for defining width of text
 */
import Width from "../../../styles/Width.module.css"

export default function TextBlock({ children }) {

  return (
      <main className={Width.default} style={{maxWidth: "var(--large-width)", margin: "auto"}}>
        {children}
      </main>
  );
}
