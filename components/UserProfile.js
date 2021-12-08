export default function UserProfile({ user }) {
  return (
    <main className="px-6 py-6 sm:px-12 sm:py-12 flex flex-col items-center">
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
