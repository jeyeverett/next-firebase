import AuthCheck from "@/auth/AuthCheck";
import PostManager from "@/post/PostManager";

export default function AdminPostEdit({}) {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}
