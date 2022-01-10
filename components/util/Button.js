export default function Button({ classes, title, children, onClick = null }) {
  return (
    <button className={classes} title={title} onClick={onClick}>
      {children}
    </button>
  );
}
