/*
 * Full Page Section
 */
export default function PageBlock({ children }) {
  return (
    <section
      style={{
        boxSizing: "border-box",
        marginTop: "var(--med-pad)",
        marginBottom: "var(--med-pad)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "var(--med-pad)"
      }}
    >
      {children}
    </section>
  );
}
