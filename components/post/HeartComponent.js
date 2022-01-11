import { HeartIcon } from "@/icons";
import HeartButton from "@/post/HeartButton";
import AuthCheck from "@/auth/AuthCheck";
import PostLink from "@/post/PostLink";

export default function HeartComponent({ post, postRef }) {
  return (
    <aside className="flex items-center">
      <span className="flex items-center text-gray-600 text-lg pr-4">
        {post.heartCount || 0}
      </span>

      <AuthCheck
        fallback={
          <PostLink linkUrl="/enter" passHref>
            <button className="px-4 py-2 border border-gray-500 bg-gray-500 shadow rounded hover:bg-white text-white hover:text-gray-700 transition-all">
              <HeartIcon classes="text-red-400 h-6 w-6 mr-2" />
              Sign Up
            </button>
          </PostLink>
        }
      >
        <HeartButton postRef={postRef} />
      </AuthCheck>
    </aside>
  );
}
