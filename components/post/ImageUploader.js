import { useState } from "react";
import { auth, storage, STATE_CHANGED } from "lib/firebase";
import { CopyIcon } from "@/icons";
import Button from "@/util/Button";
import toast from "react-hot-toast";

import Loader from "@/util/Loader";

export default function ImageUploader({ downloadURL, setDownloadURL }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const copyText = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(`![alt](${downloadURL})`);
    toast.success("Markdown URL copied");
  };

  const uploadFile = async (event) => {
    // Get the file
    const file = Array.from(event.target.files)[0];
    const extension = file.type.split("/")[1];

    // make referenec to storage bucket location
    // Using Date.now() helps prevent the file from ever being overwritten
    const ref = storage.ref(
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );

    setUploading(true);

    // Starts the upload
    const task = ref.put(file);

    // Monitor upload progress
    task.on(STATE_CHANGED, (snapshot) => {
      const percent = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0);
      setProgress(percent);

      if (snapshot.bytesTransferred === snapshot.totalBytes) return;

      // Get downloadURL AFTER task resolves (not a native Promise - can't use async await)
      toast.promise(
        task
          .then((d) => ref.getDownloadURL())
          .then((url) => {
            setDownloadURL(url);
            setUploading(false);
          }),
        {
          loading: "Uploading...",
          success: <b>Image uploaded!</b>,
          error: <b>Image upload failed.</b>,
        }
      );
    });
  };

  return (
    <div className="flex items-center">
      {!uploading ? (
        <>
          <label className="px-4 py-2 border border-gray-300 rounded-sm shadow-sm hover:bg-gray-300 transition-all flex items-center text-gray-700 text-sm font-medium cursor-pointer mr-4">
            <span className="text-center">Upload Image</span>
            <input
              type="file"
              onChange={uploadFile}
              accept="image/png,image/x-png,image/gif,image/jpeg"
              className="hidden"
            />
          </label>
        </>
      ) : (
        <div className="px-4 py-2 border border-gray-300 rounded-sm shadow-sm hover:bg-gray-300 transition-all flex items-center text-gray-700 text-sm font-medium cursor-pointer mr-4 relative">
          <Loader show={uploading} mini={true} classes="absolute" />
          <span className="absolute text-gray-700 font-medium left-16">
            {progress}%
          </span>
          <span className="opacity-0">Upload Image</span>
        </div>
      )}
      {downloadURL ? (
        <Button
          classes="relative flex items-center hover:button-animation z-10"
          title="Copy image URL"
          type="button"
          onClick={copyText}
        >
          <CopyIcon classes="text-gray-700 h-6 w-6" />
        </Button>
      ) : (
        <p className="text-gray-700 font-light">
          Upload an image and include the provided markdown in your post.
        </p>
      )}
    </div>
  );
}
