import { getUserWithUsername, postToJSON } from "lib/firebase";
import UserProfile from "@/user/UserProfile";
import PostFeed from "@/post/PostFeed";

export default function UserIndexPage({ user, posts }) {
  return (
    <main className="py-4">
      <UserProfile user={user} />
      <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-medium text-center mb-4">
        Posts
      </h2>
      {posts.length ? (
        <PostFeed posts={posts} />
      ) : (
        <p className="text-gray-700 text-center text-lg">
          This user has no published posts
        </p>
      )}
    </main>
  );
}

export async function getServerSideProps({ query }) {
  const { username } = query;
  try {
    const userDoc = await getUserWithUsername(username);

    if (!userDoc) {
      return {
        notFound: true,
      };
    }

    // JSON serializable data
    let user = null;
    let posts = null;

    if (userDoc) {
      user = userDoc.data();
      const postsQuery = userDoc.ref
        .collection("posts")
        .where("published", "==", true)
        .orderBy("createdAt", "desc")
        .limit(5);

      posts = (await postsQuery.get()).docs.map(postToJSON);
    }

    return {
      props: { user, posts },
    };
  } catch (err) {
    console.log(err);
  }
}
