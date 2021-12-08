export default function UserProfile({ user }) {
  return (
    <main>
      <div className="">
        <img src={user.photoURL} alt="" />
        <p>
          <i>@{user.username}</i>
        </p>
        <h1>{user.displayName}</h1>
      </div>
    </main>
  );
}
