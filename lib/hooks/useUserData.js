import { auth, firestore } from "lib/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

// We manage the user auth in a global context, otherwise we'd have to fetch the data on every page
/*
  Note that we have two collections:
    One (usernames) that maps usernames to the user's uid
    The other (users) maps the uid onto the user public facing user document
*/
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
