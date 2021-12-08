import Link from "next/link";
import HeartIcon from "../components/icons/heart-icon";

export default function PostItem({ post, admin = false }) {
  // word count and read time
  const wordCount = post?.content.trim().split(" ").length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="px-12 py-6 border border-gray-300 shadow rounded-lg w-3/4 mx-auto text-gray-700 mb-4 flex flex-col">
      <span className="flex items-center justify-between">
        <Link href={`/${post.username}/${post.slug}`}>
          <a>
            <strong>{post.title}</strong>
          </a>
        </Link>
        <span>
          <Link href={`/${post.username}`}>
            <a className="text-sm text-gray-500">By @{post.username}</a>
          </Link>
          <span className="text-sm text-gray-500">
            &nbsp;- {wordCount} words | {minutesToRead} min read
          </span>
        </span>
      </span>

      <footer className="mt-4">
        <span className="flex items-center justify-end text-gray-500">
          <HeartIcon classes="text-red-400 h-6 w-6 mr-2" />
          {post.heartCount} Hearts
        </span>
      </footer>
    </div>
  );
}
