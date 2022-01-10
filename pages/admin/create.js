import AuthCheck from "@/auth/AuthCheck";
import PostCreate from "@/post/PostCreate";

export default function AdminPostsPage({}) {
  return (
    <main className="px-6 py-6 sm:px-12 sm:py-12 flex flex-col items-center">
      <AuthCheck>
        <PostCreate />
      </AuthCheck>
    </main>
  );
}
