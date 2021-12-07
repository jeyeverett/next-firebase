import { useContext } from "react";
import { UserContext } from "../lib/context";
import UsernameForm from "../components/UsernameForm";
import SignInButton from "../components/SignInButton";
import SignOutButton from "../components/SignOutButton";

export default function EnterPage({}) {
  const { user, username } = useContext(UserContext);

  return (
    <main className="">
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}
