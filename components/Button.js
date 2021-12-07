export default function Button({ classes, title, children }) {
  return (
    <button className={classes} title={title}>
      {children}
    </button>
  );
}
