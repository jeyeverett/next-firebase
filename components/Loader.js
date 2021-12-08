// Loading spinner
export default function Loader({ show, mini = false, classes = "" }) {
  return show ? (
    <div className={`${classes} ${mini ? "loader-mini" : "loader"}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : null;
}
