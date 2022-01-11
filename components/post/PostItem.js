import Link from "next/link";
import PostImage from "@/post/PostImage";
import PostLink from "@/post/PostLink";
import { HeartIcon, EditIcon } from "@/icons";

import Button from "@/util/Button";

export default function PostItem({ post, admin = false }) {
  const wordCount = post?.content.trim().split(" ").length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="px-8 md:px-6 py-6 border border-gray-300 shadow rounded-sm w-3/4 mx-auto text-gray-700 mb-4 flex flex-col md:flex-row justify-between">
      <div className="flex flex-col md:flex-row">
        <PostLink
          linkUrl={`/${post.username}/${post.slug}`}
          classes="flex justify-center"
        >
          <PostImage
            imageUrl={post.imageUrl}
            title={post.title}
            classes="mr-0 sm:mr-4"
          />
        </PostLink>
        <span className="flex flex-col mt-4 md:mt-0">
          <PostLink linkUrl={`/${post.username}/${post.slug}`}>
            <strong className="hover:text-gray-500 transition-all">
              {post.title}
            </strong>
          </PostLink>
          <p className="my-2 break-all">{post?.summary}</p>
          <span>
            <PostLink
              linkUrl={`/${post.username}`}
              classes="text-sm text-gray-500 hover:text-gray-700 transition-all"
            >
              By @{post.username}
            </PostLink>
            <span className="text-sm text-gray-500">
              &nbsp;- {wordCount} words | {minutesToRead} min read
            </span>
          </span>
        </span>
      </div>

      <footer
        className={`mt-4 md:mt-0 flex items-center ${
          admin
            ? "flex-row md:flex-col justify-between"
            : "flex-col justify-end"
        }`}
      >
        {admin ? (
          <Link href={`/admin/${post.slug}`} passHref>
            <a className="flex justify-end">
              <Button
                classes="relative flex justify-center hover:button-animation"
                title="Edit post"
              >
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
