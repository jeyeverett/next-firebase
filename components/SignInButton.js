import { auth, googleAuthProvider } from "../lib/firebase";
import Image from "next/image";

// sign in with Google
export default function SignInButton() {
  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      className="px-4 py-2 border border-gray-300 rounded-sm shadow-sm hover:bg-gray-300 transition-all flex items-center"
      onClick={signInWithGoogle}
    >
      <Image src={"/google-logo.png"} alt="" height="30" width="30" />
      <span className="ml-2 text-gray-700 text-sm font-medium">
        Sign in with google
      </span>
    </button>
  );
}
