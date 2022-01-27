import Loader from "@/util/Loader";
import PostFeed from "@/post/PostFeed";
import { useState } from "react";
import { firestore, postToJSON, fromMillis } from "lib/firebase";

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [postsEnd, setPostsEnd] = useState(false);
  const [loading, setLoading] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    // we use the timestamp for pagination and it needs to be in firestore format (not number)
    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor) // start after the most recently loaded post's timestamp
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    // if the newPosts array has less items than LIMIT then we know we've reached the end
    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main className="px-0 pb-6 xs:px-6 xs:py-6 sm:px-12 sm:py-12 flex flex-col items-center w-full">
      <h1 className="text-center text-3xl font-medium text-gray-700 mb-8">
        Main Feed
      </h1>
      <PostFeed posts={posts} />

      {!loading && !postsEnd && (
        <button
          onClick={getMorePosts}
          className="px-4 py-2 border border-gray-500 bg-gray-500 shadow rounded hover:bg-white text-white hover:text-gray-700 transition-all mt-4"
        >
          Load more
        </button>
      )}

      <Loader show={loading} classes="mt-4" />

      {postsEnd && (
        <span className="text-gray-700 uppercase tracking-wider font-medium mt-4">
          The End!
        </span>
      )}
    </main>
  );
}

//  Max posts to query per page
const LIMIT = 1;

export async function getServerSideProps(context) {
  // collectionGroup lets us grab any subcollection named 'posts', where it is in the tree
  // the alternative would require grabbing the list of all users and iterating over them to
  // get each one's 'posts' subcollection
  const postsQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);
  return {
    props: { posts },
  };
}
