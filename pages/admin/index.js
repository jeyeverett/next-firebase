import AuthCheck from "@/auth/AuthCheck";
import PostCreate from "@/post/PostCreate";
import PostList from "@/post/PostList";

export default function AdminPostsPage({}) {
  return (
    <main className="px-6 py-6 sm:px-12 sm:py-12 flex flex-col items-center">
      <AuthCheck>
        <PostList />
        <PostCreate />
      </AuthCheck>
    </main>
  );
}
