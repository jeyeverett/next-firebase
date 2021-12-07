// Loading spinner
export default function Loader({ show, mini }) {
  return show ? (
    <div className={mini ? "loader-mini" : "loader"}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : null;
}
