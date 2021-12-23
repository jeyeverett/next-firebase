import ImageUploader from "@/post/ImageUploader";
import { serverTimestamp } from "lib/firebase";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

export default function PostForm({ defaultValues, postRef, preview }) {
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
