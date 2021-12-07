import { auth } from "../lib/firebase";

export default function SignOutButton() {
  return (
    <button
      className="px-4 py-2 border border-gray-300 rounded-sm shadow-sm hover:bg-gray-300 transition-all flex items-center text-gray-700 text-sm font-medium"
      onClick={() => auth.signOut()}
    >
      Sign Out
    </button>
  );
}
