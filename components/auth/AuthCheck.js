import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "lib/context";
import Loader from "@/util/Loader";

// This component lets us easily place a gate between users and content requiring auth
// It also guarantees that if a user has access then they have a username / user data
// which is available through the userContext

export default function AuthCheck({ children, fallback }) {
  const { username } = useContext(UserContext);
  return username
    ? children || <Loader show={true} /> // if we don't return null and children is undefined we will get an error
    : fallback || (
        <Link href="/enter" className="flex justify-center">
          You must be signed in to continue.
        </Link>
      );
}
