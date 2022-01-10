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

  const isValid = title.length > 3 && title.length < 60;

  const createPost = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;

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
    <>
      <h1 className="text-center text-3xl font-medium text-gray-700 mb-8">
        Create a New Post
      </h1>
      <form
        className="flex flex-col items-center w-full xs:w-1/2 md:w-1/4"
        onSubmit={createPost}
      >
        <label
          htmlFor="post-title"
          className="self-start text-gray-700 font-semibold"
        >
          Post Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="post-title"
          placeholder="Name your new post..."
          maxLength="60"
          className="my-4 w-full border border-gray-700 rounded-sm px-2 py-1"
        />
        <p className="self-start">
          <strong className="text-gray-500">Slug:</strong> {slug}
        </p>
        <button
          type="submit"
          disabled={!isValid}
          className="px-4 py-2 border border-gray-300 rounded-sm shadow-sm hover:bg-gray-300 transition-all flex items-center text-gray-700 text-sm font-medium my-4"
        >
          Create New Post
        </button>
      </form>
    </>
  );
}
