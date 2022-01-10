import Link from "next/link";
import Image from "next/image";
import { HeartIcon, EditIcon, QuestionIcon } from "@/icons";
import ReactMarkdown from "react-markdown";

import Button from "@/util/Button";

export default function PostItem({ post, admin = false }) {
  const wordCount = post?.content.trim().split(" ").length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="px-8 md:px-6 py-6 border border-gray-300 shadow rounded-sm w-3/4 mx-auto text-gray-700 mb-4 flex flex-col md:flex-row justify-between">
      <div className="flex flex-col md:flex-row">
        <figure className="flex flex-col justify-center items-center md:mr-6">
          {post.imageUrl ? (
            <Link href={`/${post.username}/${post.slug}`}>
              <a>
                <div className="w-32 relative">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="cover"
                    className="border rounded"
                  />
                </div>
              </a>
            </Link>
          ) : (
            <Link href={`/${post.username}/${post.slug}`}>
              <a>
                <QuestionIcon classes="h-32 w-32 text-gray-700" />
              </a>
            </Link>
          )}
        </figure>
        <span className="flex flex-col mt-4 md:mt-0">
          <Link href={`/${post.username}/${post.slug}`}>
            <a>
              <strong className="hover:text-gray-500 transition-all">
                {post.title}
              </strong>
            </a>
          </Link>
          <p className="my-2 break-all">{post?.content.slice(0, 200)}</p>
          <span>
            <Link href={`/${post.username}`}>
              <a className="text-sm text-gray-500 hover:text-gray-700 transition-all">
                By @{post.username}
              </a>
            </Link>
            <span className="text-sm text-gray-500">
              &nbsp;- {wordCount} words | {minutesToRead} min read
            </span>
          </span>
        </span>
      </div>

      <footer
        className={`mt-4 md:mt-0 flex flex-col ${
          admin ? "justify-between" : "justify-end"
        }`}
      >
        {admin ? (
          <Link href={`/admin/${post.slug}`} passHref>
            <a className="flex justify-end">
              <Button classes="relative flex justify-center hover:button-animation ">
                <EditIcon classes="h-5 w-5 text-gray-700" />
              </Button>
            </a>
          </Link>
        ) : null}

        <span className="flex items-center justify-end text-gray-500">
          {post.heartCount}
          <HeartIcon classes="text-red-400 h-6 w-6 ml-2" />
        </span>
      </footer>
    </div>
  );
}
