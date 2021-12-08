import { useState } from "react";
import { auth, storage, STATE_CHANGED } from "../lib/firebase";
import Loader from "./Loader";

export default function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

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

      // Get downloadURL AFTER task resolves (not a native Promise - can't use async await)
      task
        .then((d) => ref.getDownloadURL())
        .then((url) => {
          setDownloadURL(url);
          setUploading(false);
        });
    });
  };

  return (
    <div>
      <Loader show={uploading} />
      {uploading && <h3>{progress}%</h3>}

      {!uploading && (
        <>
          {/* Wrapping input in the label element makes it easier to style */}
          <label>
            Upload Image
            <input
              type="file"
              onChange={uploadFile}
              accept="image/png,image/x-png,image/gif,image/jpeg"
            />
          </label>
        </>
      )}

      {downloadURL && <code className="">{`![alt](${downloadURL})`}</code>}
    </div>
  );
}
