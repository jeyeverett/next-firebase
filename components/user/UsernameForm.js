import { firestore } from "lib/firebase";
import { useContext, useState, useEffect, useCallback } from "react";
import { UserContext } from "lib/context";
import Loader from "@/util/Loader";

import debounce from "lodash.debounce";
import toast from "react-hot-toast";

export default function UsernameForm() {
  const { user, username } = useContext(UserContext);
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkUsername(formValue);
    usernameMessage({ formValue, isValid });
  }, [formValue, isValid, checkUsername, usernameMessage]);

  // batch write to firestore
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const userDoc = firestore.doc(`users/${user.uid}`);
      const usernameDoc = firestore.doc(`usernames/${formValue}`);
      const batch = firestore.batch();

      batch.set(userDoc, {
        username: formValue,
        photoURL: user.photoURL,
        displayName: user.displayName,
      });
      batch.set(usernameDoc, { uid: user.uid });
      await batch.commit();
    } catch (err) {
      console.log(err);
    }
    return null;
  };

  const onChange = (event) => {
    const { value } = event.target;
    const regEx = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (value.length < 3) {
      setFormValue(value.toLowerCase());
      setLoading(false);
      setIsValid(false);
    }

    if (regEx.test(value.toLowerCase())) {
      setFormValue(value.toLowerCase());
      setLoading(true);
      setIsValid(true);
    }
  };

  // hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  const usernameMessage = useCallback(
    debounce(({ formValue, isValid }) => {
      if (isValid) {
        toast.success(`${formValue} is available!`);
      } else if (formValue && !isValid) {
        toast.error(`That username is taken!`);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section>
        <h3 className="text-2xl text-gray-700 font-medium mb-8">
          Choose Username
        </h3>
        <form onSubmit={onSubmit}>
          <span className="flex items-center">
            <input
              name="username"
              placeholder="username"
              value={formValue}
              onChange={onChange}
              className="border border-gray-300 rounded-sm shadow-sm py-1 px-2 text-gray-700"
            />
          </span>

          <button
            type="submit"
            disabled={!isValid}
            className="px-4 py-2 border border-gray-300 rounded-sm shadow-sm hover:bg-gray-300 transition-all flex items-center text-gray-700 text-sm font-medium mx-auto mt-8"
          >
            {!loading ? (
              <span>Choose</span>
            ) : (
              <Loader show={loading} mini={true} />
            )}
          </button>

          {/* <h3 className="mt-4">--DEBUG--</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div> */}
        </form>
      </section>
    )
  );
}
