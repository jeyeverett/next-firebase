import { firestore, auth, increment } from "lib/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { HeartIcon } from "@/icons";

export default function HeartButton({ postRef }) {
  const heartRef = postRef.collection("hearts").doc(auth.currentUser.uid);
  const [heartDoc] = useDocument(heartRef);

  const addHeart = async () => {
    const { uid } = auth.currentUser;
    const batch = firestore.batch();

    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });

    try {
      await batch.commit();
    } catch (err) {
      console.log(err);
    }
  };

  const removeHeart = async () => {
    const batch = firestore.batch();

    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);

    try {
      await batch.commit();
    } catch (err) {
      console.log(err);
    }
  };

  return heartDoc?.exists() ? (
    <button
      className="px-4 py-2 border border-gray-400 shadow rounded hover:bg-white text-white hover:bg-gray-400 transition-all"
      onClick={removeHeart}
      title="Unheart post"
    >
      <HeartIcon classes="h-5 w-5 text-red-500" />
    </button>
  ) : (
    <button
      className="px-4 py-2 border border-gray-400 bg-gray-400 shadow rounded hover:bg-white text-white hover:text-gray-700 transition-all"
      onClick={addHeart}
      title="Heart post"
    >
      <HeartIcon classes="h-5 w-5" />
    </button>
  );
}
