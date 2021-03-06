import { auth, googleAuthProvider } from "lib/firebase";
import { useContext } from "react";
import { UserContext } from "lib/context";
import Image from "next/image";
import Loader from "@/util/Loader";

// sign in with Google
export default function SignInButton({ classes }) {
  const { loading, updateLoading } = useContext(UserContext);

  const signInWithGoogle = async () => {
    try {
      updateLoading(true);
      await auth.signInWithPopup(googleAuthProvider);
    } catch (err) {
      console.log(err);
      updateLoading(false);
    }
  };

  return (
    <button
      className={
        classes +
        " px-4 py-2 border border-gray-300 rounded-sm shadow-sm hover:bg-gray-300 transition-all flex items-center w-full"
      }
      onClick={signInWithGoogle}
    >
      {loading ? (
        <Loader show={loading} mini={true} />
      ) : (
        <Image src={"/google-logo.png"} alt="" height="36" width="36" />
      )}
      <span className="text-center w-full text-gray-700 text-sm font-medium">
        Sign in with google
      </span>
    </button>
  );
}
