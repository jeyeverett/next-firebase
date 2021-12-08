import Link from "next/link";
import HeartIcon from "../components/icons/heart-icon";

export default function PostItem({ post, admin = false }) {
  // word count and read time
  const wordCount = post?.content.trim().split(" ").length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="px-12 py-6 border border-gray-300 shadow rounded-lg w-3/4 mx-auto text-gray-700 mb-4">
      <Link href={`/${post.username}`}>
        <a>
          <strong>By @{post.username}</strong>
        </a>
      </Link>

      <Link href={`/${post.username}/${post.slug}`}>
        <a>
          <strong>{post.title}</strong>
        </a>
      </Link>

      <footer>
        <span>
          {wordCount} words. {minutesToRead} min read
        </span>
        <span className="flex items-center">
          <HeartIcon classes="text-red-400 h-8 w-8" />
          {post.heartCount} Hearts
        </span>
      </footer>
    </div>
  );
}
