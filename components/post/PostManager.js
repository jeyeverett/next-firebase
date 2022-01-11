import { useState } from "react";
import { useRouter } from "next/router";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore, auth } from "lib/firebase";
import PostForm from "@/post/PostForm";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "lib/context";

export default function PostManager() {
  const [preview, setPreview] = useState(false);
  const { loading, updateLoading } = useContext(UserContext);
  const router = useRouter();
  const { slug } = router.query;

  const postRef = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts")
    .doc(slug);

  const [post] = useDocumentData(postRef); //use useDocumentDataOnce if you don't need realtime updates

  return (
    <main className="p-0 xs:px-6 xs:py-6 sm:px-12 sm:py-12 flex flex-col items-center w-full">
      {post && (
        <>
          <h1 className="text-3xl font-medium text-gray-700 mb-16">
            {post.title}
          </h1>
          <div className="flex flex-col sm:flex-row w-full md:w-3/4 lg:w-5/6 justify-center ">
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
              />
            </section>

            <aside className="flex flex-col items-center justify-start p-4 border border-gray-300 rounded mt-4 sm:mt-0 sm:ml-4">
              <h3 className="text-gray-700 font-semibold text-lg mb-4 ">
                Tools
              </h3>
              <div className="flex sm:flex-col items-center justify-center">
                <button
                  onClick={() => setPreview(!preview)}
                  className="px-4 py-2 border border-gray-300 rounded-sm shadow-sm hover:bg-gray-300 transition-all flex items-center text-gray-700 text-sm font-medium mr-2 sm:mr-0 sm:mb-2 sm:self-stretch flex justify-center"
                >
                  {preview ? "Edit" : "Preview"}
                </button>
                <Link href={`/${post.username}/${post.slug}`} passHref>
                  <a>
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-sm shadow-sm hover:bg-gray-300 transition-all flex items-center text-gray-700 text-sm font-medium"
                      onClick={() => updateLoading(true)}
                    >
                      Live view
                    </button>
                  </a>
                </Link>
              </div>
            </aside>
          </div>
        </>
      )}
    </main>
  );
}
