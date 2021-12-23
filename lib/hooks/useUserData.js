import { auth, firestore } from "lib/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export function useUserData() {
  const [user] = useAuthState(auth); //basically a hook that implements onAuthStateChanged
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe; //unsubscribe from real time updates
    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }
    return unsubscribe;
  }, [user]);

  return { user, username };
}
