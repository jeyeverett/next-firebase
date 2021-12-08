import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";

// This component lets us easily place a gate between users and content requiring auth
// It also guarantees that if a user has access then they have a username / user data
// which is available through the userContext

export default function AuthCheck(props) {
  const { username } = useContext(UserContext);
  return username
    ? props.children || null // if we don't return null and props.children is undefined we will get an error
    : props.fallback || (
        <Link href="/enter">You must be signed in to continue.</Link>
      );
}
