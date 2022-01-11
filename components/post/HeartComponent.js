import { HeartIcon } from "@/icons";
import HeartButton from "@/post/HeartButton";
import AuthCheck from "@/auth/AuthCheck";
import PostLink from "@/post/PostLink";
import toast from "react-hot-toast";

export default function HeartComponent({ post, postRef }) {
  return (
    <aside className="flex items-center">
      <span className="flex items-center text-gray-600 text-lg pr-4">
        {post.heartCount || 0}
      </span>

      <AuthCheck
        fallback={
          <PostLink linkUrl="/enter" passHref>
            <button
              className="px-4 py-2 border border-gray-400 bg-gray-400 shadow rounded hover:bg-white text-white hover:text-gray-700 transition-all"
              onClick={() =>
                toast.error("You need to be signed in to heart posts.")
              }
            >
              <HeartIcon classes="h-6 w-6" />
            </button>
          </PostLink>
        }
      >
        <HeartButton postRef={postRef} />
      </AuthCheck>
    </aside>
  );
}
