import { auth } from "../lib/firebase";
import { useContext, useEffect } from "react";
import { UserContext } from "../lib/context";

export default function SignOutButton() {
  // when SignOutButton mounts our auth process is complete, so we set loading to false
  // without this the UsernameForm component will flash for a second before the UI is updated
  const { updateLoading } = useContext(UserContext);
  useEffect(() => {
    updateLoading(false);
  });

  return (
    <button
      className="px-4 py-2 border border-gray-300 rounded-sm shadow-sm hover:bg-gray-300 transition-all flex items-center text-gray-700 text-sm font-medium"
      onClick={() => auth.signOut()}
    >
      Sign Out
    </button>
  );
}
