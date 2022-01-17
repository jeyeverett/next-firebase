import { useContext, useState } from "react";
import { UserContext } from "lib/context";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore, auth } from "lib/firebase";
import PostForm from "@/post/PostForm";
import PostLink from "@/post/PostLink";

export default function PostManager() {
  const [preview, setPreview] = useState(false);
  const [isDeletable, setDeletable] = useState(false);
  const { updateLoading } = useContext(UserContext);

  const router = useRouter();
  const { slug } = router.query;

  const postRef = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts")
    .doc(slug);

  const heartRef = postRef.collection("hearts").doc(auth.currentUser.uid);

  const confirmDelete = () => {
    setDeletable(true);
  };

  const deletePost = async () => {
    updateLoading(true);
    const batch = firestore.batch();
    batch.delete(postRef);
    batch.delete(heartRef);

    try {
      await batch.commit();
      setDeletable(false);
      toast.success("Post deleted!");
      router.push("/admin");
    } catch (err) {
      updateLoading(false);
      toast.error("Failed to delete post.");
      toast.error("Please try again laster.");
      console.log(err);
    }
  };

  const [post] = useDocumentData(postRef); //use useDocumentDataOnce if you don't need realtime updates

  return (
    <main className="px-6 py-6 sm:px-12 sm:py-12 flex flex-col items-center w-full">
      {post && (
        <>
          <h1 className="text-3xl font-medium text-gray-700 mb-8 md:mb-16">
            {post.title}
          </h1>
          <div className="flex flex-col sm:flex-row w-full xl:w-3/4 justify-center ">
            <section className="w-full sm:w-3/4 px-6 py-4 border border-gray-300 rounded">
              <p className="text-gray-700 font-semibold mb-4">
                Post Id:
                <span className="font-normal"> {post.slug}</span>
              </p>
              <PostForm
                post={post}
                postRef={postRef}
                defaultValues={post}
                preview={preview}
                updateLoading={updateLoading}
              />
            </section>

            <aside className="flex flex-col items-center justify-start p-4 border border-gray-300 rounded mb-4 sm:mb-0 sm:ml-4 order-first sm:order-last">
              <h3 className="text-gray-700 font-semibold text-lg mb-4">
                Tools
              </h3>
              <div className="flex flex-wrap xs:flex-nowrap sm:flex-col items-center justify-center sm:justify-between h-full w-full">
                <span className="w-full mb-2 xs:mb-0 flex justify-center xs:justify-start sm:flex-col">
                  <button
                    onClick={() => setPreview(!preview)}
                    className="px-4 py-2 border border-gray-300 rounded-sm shadow-sm hover:bg-gray-300 transition-all flex items-center text-gray-700 text-sm font-medium mr-2 sm:mr-0 sm:mb-2 sm:self-stretch flex justify-center"
                  >
                    {preview ? "Edit" : "Preview"}
                  </button>
                  <PostLink linkUrl={`/${post.username}/${post.slug}`} passHref>
                    <button className="px-4 py-2 border border-gray-300 rounded-sm shadow-sm hover:bg-gray-300 transition-all flex items-center text-gray-700 text-sm font-medium">
                      Live view
                    </button>
                  </PostLink>
                </span>
                <span className="flex justify-center xs:justify-end sm:flex-col w-full">
                  {isDeletable && (
                    <button
                      onClick={() => deletePost()}
                      className="px-4 py-2 border border-gray-700 bg-gray-700 text-white rounded-sm shadow-sm hover:bg-gray-500 transition-all flex items-center text-sm font-medium mr-2 sm:mr-0 sm:mb-2 sm:w-full flex justify-center sm:justify-self-end"
                    >
                      Confirm
                    </button>
                  )}
                  <button
                    onClick={() => confirmDelete()}
                    className="px-4 py-2 border border-red-600 bg-red-600 text-white rounded-sm shadow-sm hover:bg-red-300 transition-all flex items-center text-sm font-medium sm:mb-2 sm:w-full flex justify-center sm:justify-self-end"
                  >
                    Delete
                  </button>
                </span>
              </div>
            </aside>
          </div>
        </>
      )}
    </main>
  );
}
