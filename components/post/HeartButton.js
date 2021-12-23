import { firestore, auth, increment } from "lib/firebase";
import { useDocument } from "react-firebase-hooks/firestore";

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
      className="px-4 py-2 border border-gray-500 bg-gray-500 shadow rounded hover:bg-white text-white hover:text-gray-700 transition-all mt-4"
      onClick={removeHeart}
    >
      Unheart
    </button>
  ) : (
    <button
      className="px-4 py-2 border border-gray-500 bg-gray-500 shadow rounded hover:bg-white text-white hover:text-gray-700 transition-all mt-4"
      onClick={addHeart}
    >
      Heart
    </button>
  );
}
