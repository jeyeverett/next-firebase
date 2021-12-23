import { UserContext } from "lib/context";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { firestore, auth, serverTimestamp } from "lib/firebase";

import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";

export default function PostCreate() {
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
