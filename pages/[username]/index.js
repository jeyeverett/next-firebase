import { getUserWithUsername, postToJSON } from "lib/firebase";
import UserProfile from "@/user/UserProfile";
import PostFeed from "@/post/PostFeed";

export default function UserIndexPage({ user, posts }) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
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
