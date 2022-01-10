import Link from "next/link";
import ReactMarkdown from "react-markdown";
import style from "styles/markdown.module.css";
import { useContext } from "react";
import { UserContext } from "lib/context";

export default function PostContent({ post }) {
  const { loading, updateLoading } = useContext(UserContext);
  updateLoading(false);

  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt) // if the timestamp is a numbe (in millis) we use new Date()
      : post.createdAt.toDate(); // if the timestamp is in firestore format we use toDate()

  return (
    <div>
      <h1 className="text-center text-3xl font-medium text-gray-700 mb-8">
        {post?.title}
      </h1>
      <span className="text-sm">
        Written by &nbsp;
        <Link href={`/${post.username}`}>
          <a>@{post.username}</a>
        </Link>
        &nbsp; on {createdAt.toISOString()}
      </span>

      <ReactMarkdown className={style.markdown}>{post?.content}</ReactMarkdown>
    </div>
  );
}
