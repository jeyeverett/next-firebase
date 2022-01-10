import { useContext } from "react";
import { UserContext } from "lib/context";
import dynamic from "next/dynamic";
const UsernameForm = dynamic(() => import("@/user/UsernameForm"));
const SignInButton = dynamic(() => import("@/auth/SignInButton"));
const SignOutButton = dynamic(() => import("@/auth/SignOutButton"));

export default function EnterPage() {
  const { user, username } = useContext(UserContext);

  return (
    <main className="">
      {!user ? (
        <SignInButton />
      ) : username ? (
        <SignOutButton />
      ) : (
        <UsernameForm />
      )}
    </main>
  );
}
