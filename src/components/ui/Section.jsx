export default function Section({ id, children, className, style }) {
  return (
    <section
      id={id}
      className={className}
      style={{
        position: "relative",
        zIndex: 1,
        paddingBlock: "clamp(4rem, 12vh, 8rem)",
        ...style,
      }}
    >
      <div className="container">{children}</div>
    </section>
  );
}
