import { useContext } from "react";
import { UserContext } from "lib/context";
import dynamic from "next/dynamic";
const UsernameForm = dynamic(() => import("@/user/UsernameForm"));
const SignInGoogleButton = dynamic(() => import("@/auth/SignInGoogleButton"));
const SignOutButton = dynamic(() => import("@/auth/SignOutButton"));
const SignUpForm = dynamic(() => import("@/auth/SignUpForm"));

export default function EnterPage() {
  const { user, username } = useContext(UserContext);

  return (
    <main className="flex flex-col items-center mx-auto py-8 w-min">
      {!user ? (
        <>
          <SignUpForm />
          <SignInGoogleButton classes="mt-4" />
        </>
      ) : username ? (
        <SignOutButton />
      ) : (
        <UsernameForm />
      )}
    </main>
  );
}
