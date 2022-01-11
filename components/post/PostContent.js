import Link from "next/link";
import ReactMarkdown from "react-markdown";
import styles from "styles/markdown.module.css";
import { useContext } from "react";
import { UserContext } from "lib/context";

export default function PostContent({ post }) {
  const { updateLoading } = useContext(UserContext);
  updateLoading(false);

  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt) // if the timestamp is a numbe (in millis) we use new Date()
      : post.createdAt.toDate(); // if the timestamp is in firestore format we use toDate()

  return (
    <article className="w-1/2 mx-auto">
      <h1 className="text-3xl font-medium text-gray-700 mt-12">{post.title}</h1>

      <p className="text-sm font-light mb-8 italic">
        Written by &nbsp;
        <Link href={`/${post.username}`}>
          <a>@{post.username}</a>
        </Link>
        &nbsp; on {createdAt.toISOString().slice(0, 10)}
      </p>

      <ReactMarkdown className={styles.markdown + " mt-8"}>
        {post.content}
      </ReactMarkdown>
    </article>
  );
}
