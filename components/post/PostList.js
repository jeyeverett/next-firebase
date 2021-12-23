import PostFeed from "@/post/PostFeed";
import { firestore, auth } from "lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";

export default function PostList() {
  const ref = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts");
  const query = ref.orderBy("createdAt");
  const [querySnapshot] = useCollection(query);
  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1 className="text-center text-3xl font-medium text-gray-700 mb-8">
        Manage Posts
      </h1>
      <PostFeed posts={posts} admin />
    </>
  );
}
