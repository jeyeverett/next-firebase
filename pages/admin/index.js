import AuthCheck from "../../components/AuthCheck";
import PostFeed from "../../components/PostFeed";
import { UserContext } from "../../lib/context";
import { firestore, auth, serverTimestamp } from "../../lib/firebase";

import { useContext, useState } from "react";
import { useRouter } from "next/router";

import { useCollection } from "react-firebase-hooks/firestore";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";

export default function AdminPostsPage({}) {
  return (
    <main className="px-6 py-6 sm:px-12 sm:py-12 flex flex-col items-center">
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
}

function PostList() {
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

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  // encodeURI is a browser API to create URL safe strings (removes ?!/)
  const slug = encodeURI(kebabCase(title));

  const isValid = title.length > 3 && title.length < 100;

  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;

    // if we didn't use .doc(slug) then firestore would create the document with a uid as the identifier
    const ref = firestore
      .collection("users")
      .doc(uid)
      .collection("posts")
      .doc(slug);

    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: "# hello world!",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    try {
      await ref.set(data);
      toast.success("Post created!");
      router.push(`/admin/${slug}`);
    } catch (err) {
      console.log(err);
      toast.error("Failed to create post.");
      toast.error("Please try again later.");
    }
  };

  return (
    <form onSubmit={createPost}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Your new post..."
        className=""
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button
        type="submit"
        disabled={!isValid}
        className="px-4 py-2 border border-gray-300 rounded-sm shadow-sm hover:bg-gray-300 transition-all flex items-center text-gray-700 text-sm font-medium"
      >
        Create New Post
      </button>
    </form>
  );
}
