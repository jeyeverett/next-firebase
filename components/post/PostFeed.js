import PostItem from "@/post/PostItem";
import Loader from "@/util/Loader";

export default function PostFeed({ posts, admin }) {
  return (
    (posts &&
      posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))) || <Loader show={true} />
  );
}
