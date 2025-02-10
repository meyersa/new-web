/*
 * Full Page Section
 */
export default function PageBlock({ children }) {
  return (
    <section
      style={{
        minHeight: "100vh",
        boxSizing: "border-box",
        paddingTop: "var(--med-pad)",
        paddingBottom: "var(--med-pad)",
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
