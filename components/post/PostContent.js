import Link from "next/link";
import ReactMarkdown from "react-markdown";
import styles from "styles/markdown.module.css";
import HeartComponent from "./HeartComponent";

export default function PostContent({ post, postRef }) {
  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt) // if the timestamp is a numbe (in millis) we use new Date()
      : post.createdAt.toDate(); // if the timestamp is in firestore format we use toDate()

  return (
    <article className="w-full p-2 xs:p-0 xs:w-3/4 md:w-1/2 mx-auto">
      <div className="flex justify-between items-center mt-0 md:mt-12">
        <h1 className="text-3xl font-medium text-gray-700">{post.title}</h1>
        <HeartComponent post={post} postRef={postRef} />
      </div>

      <p className="text-sm font-light mb-8 italic">
        Written by &nbsp;
        <Link href={`/${post.username}`}>
          <a>@{post.username}</a>
        </Link>
        &nbsp; on {createdAt.toISOString().slice(0, 10)}
      </p>

      <ReactMarkdown className={styles.markdown + " my-8"}>
        {post.content}
      </ReactMarkdown>
    </article>
  );
}
