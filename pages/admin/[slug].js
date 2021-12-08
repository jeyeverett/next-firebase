import { useState } from "react";
import { useRouter } from "next/router";

import AuthCheck from "../../components/AuthCheck";
import ImageUploader from "../../components/ImageUploader";

import { firestore, auth, serverTimestamp } from "../../lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminPostEdit({}) {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}

function PostManager() {
  const [preview, setPreview] = useState(false);
  const router = useRouter();
  const { slug } = router.query;

  const postRef = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts")
    .doc(slug);

  const [post] = useDocumentData(postRef); //use useDocumentDataOnce if you don't need realtime updates

  return (
    <main className="px-6 py-6 sm:px-12 sm:py-12 flex flex-col items-center">
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>
            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </section>

          <aside>
            <h3>Tools</h3>
            <button onClick={() => setPreview(!preview)}>
              {preview ? "Edit" : "Preview"}
            </button>
            <Link href={`/${post.username}/${post.slug}`} passHref>
              <a>
                <button>Live view</button>
              </a>
            </Link>
          </aside>
        </>
      )}
    </main>
  );
}

function PostForm({ defaultValues, postRef, preview }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const updatePost = async ({ content, published }) => {
    try {
      await postRef.update({
        content,
        published,
        updatedAt: serverTimestamp(),
      });
      reset({ content, published });
      toast.success("Post updated!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="">
          <ReactMarkdown>{watch("content")}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? "hidden" : ""}>
        <ImageUploader />

        <textarea
          {...register("content", {
            maxLength: { value: 20000, message: "content is too long" },
            minLength: { value: 10, message: "content is too short" },
            required: { value: true, message: "content is required" },
          })}
        />

        {errors.content && <p className="">{errors.content.message}</p>}

        <fieldset>
          <input
            className=""
            id="published"
            type="checkbox"
            {...register("published")}
          />
          <label htmlFor="published">Published</label>
        </fieldset>
      </div>

      <button
        type="submit"
        disabled={!isDirty || !isValid}
        className="px-4 py-2 border border-gray-300 rounded-sm shadow-sm hover:bg-gray-300 transition-all flex items-center text-gray-700 text-sm font-medium"
      >
        Save Changes
      </button>
    </form>
  );
}
