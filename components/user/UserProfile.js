import Image from "next/image";

export default function UserProfile({ user }) {
  return (
    <main className="px-6 py-6 sm:px-12 sm:py-12 flex flex-col items-center">
      <div className="flex flex-col justify-center items-center">
        <div className="w-20 relative">
          <Image
            src={user.photoURL}
            alt={user.username}
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="cover"
            className="border rounded"
          />
        </div>
        <p>
          <i>@{user.username}</i>
        </p>
        <h1>{user.displayName}</h1>
      </div>
    </main>
  );
}
