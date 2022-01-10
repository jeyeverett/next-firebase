import { useContext, useState } from "react";
import { UserContext } from "lib/context";
import ImageUploader from "@/post/ImageUploader";
import { serverTimestamp } from "lib/firebase";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { CheckIcon } from "@/icons";

export default function PostForm({ defaultValues, postRef, preview }) {
  const { loading, updateLoading } = useContext(UserContext);
  const [downloadURL, setDownloadURL] = useState(null);

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
    updateLoading(true);
    try {
      await postRef.update({
        content,
        published,
        updatedAt: serverTimestamp(),
        imageUrl: downloadURL ? downloadURL : null,
      });
      reset({ content, published });
      updateLoading(false);
      toast.success("Post updated!");
    } catch (err) {
      updateLoading(false);
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="p-4 w-full min-h-64">
          <ReactMarkdown>{watch("content")}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? "hidden" : ""}>
        <ImageUploader
          downloadURL={downloadURL}
          setDownloadURL={setDownloadURL}
        />

        <textarea
          {...register("content", {
            maxLength: { value: 20000, message: "content is too long" },
            minLength: { value: 10, message: "content is too short" },
            required: { value: true, message: "content is required" },
          })}
          id="text-area"
          className="p-4 w-full border border-gray-100 bg-gray-100 rounded h-64 resize-none my-4"
          placeholder="Write your post here!"
        />

        <fieldset className="flex items-center justify-end">
          <label
            htmlFor="published"
            className="cursor-pointer select-none pr-2 text-gray-700 font-medium"
          >
            Published
          </label>
          <input
            className="absolute cursor-pointer opacity-0 h-8 w-8"
            type="checkbox"
            id="published"
            {...register("published")}
          />
          <CheckIcon classes="text-gray-700" />
        </fieldset>
      </div>

      {errors.content && (
        <p className="text-gray-700 font-bold uppercase my-4 text-center">
          {errors.content.message}
        </p>
      )}

      {!preview && (
        <button
          type="submit"
          disabled={!isDirty || !isValid}
          className="px-4 py-2 border border-gray-300 rounded-sm shadow-sm hover:bg-gray-300 transition-all flex items-center text-gray-700 text-sm font-medium mx-auto"
        >
          Save Changes
        </button>
      )}
    </form>
  );
}
