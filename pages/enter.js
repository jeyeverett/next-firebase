import { useContext } from "react";
import { UserContext } from "lib/context";
import UsernameForm from "@/user/UsernameForm";
import SignInButton from "@/auth/SignInButton";
import SignOutButton from "@/auth/SignOutButton";

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
