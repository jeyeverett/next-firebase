import PostImage from "@/post/PostImage";

export default function UserProfile({ user }) {
  return (
    <main className="px-6 py-6 sm:px-12 sm:py-12 flex flex-col items-center">
      <div className="flex flex-col justify-center items-center">
        <PostImage imageUrl={user.imageUrl} title={user.username} />
        <h1 className="text-2xl text-gray-700 font-semibold">
          {user.displayName}
        </h1>
        <p>
          <i>@{user.username}</i>
        </p>
      </div>
    </main>
  );
}
