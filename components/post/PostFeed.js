import PostItem from "@/post/PostItem";

export default function PostFeed({ posts, admin }) {
  return (
    (posts &&
      posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))) || <p>test</p>
  );
}
