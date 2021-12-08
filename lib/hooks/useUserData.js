import { auth, firestore } from "../firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe; //unsubscribe from real time updates
    if (user) {
      try {
        const ref = firestore.collection("users").doc(user.uid);
        unsubscribe = ref.onSnapshot((doc) => {
          setUsername(doc.data()?.username);
          setLoading(false);
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      setUsername(null);
      setLoading(false);
    }

    return unsubscribe;
  }, [user]);

  return { user, username, loading };
}
