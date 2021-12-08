import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import AccountIcon from "./icons/account-icon";
import HomeIcon from "./icons/home-icon";
import AddIcon from "./icons/add-icon";
import Button from "../components/Button";

export default function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="pt-2 flex justify-center relative">
      <ul className="w-5/6 px-6 py-2 border border-gray-200 shadow-sm rounded-3xl flex items-center justify-between">
        <li>
          <Link href="/">
            <a>
              <Button
                classes="relative flex items-center hover:button-animation z-10"
                title="Home"
              >
                <HomeIcon classes="h-8 w-8 text-gray-500" />
              </Button>
            </a>
          </Link>
        </li>
        <span className="flex items-center">
          {username && (
            <li>
              <Link href="/admin" passHref>
                <a>
                  <Button
                    classes="relative flex items-center hover:button-animation z-10"
                    title="Add post"
                  >
                    <AddIcon classes="h-8 w-8 text-gray-500" />
                  </Button>
                </a>
              </Link>
            </li>
          )}

          {user && username && (
            <Link href={`/${username}`} passHref>
              <a className="h-9 absolute right-5 top-3.5 rounded-full shadow">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    width="36"
                    height="36"
                    alt={username}
                    className="rounded-full"
                  />
                ) : (
                  <Button
                    classes="relative flex items-center hover:button-animation z-10"
                    title="Add post"
                  >
                    <AccountIcon classes="h-8 w-8 text-gray-500" />
                  </Button>
                )}
              </a>
            </Link>
          )}

          {!username && (
            <>
              <li>
                <Link href="/enter">
                  <a>
                    <Button
                      classes="relative flex items-center hover:button-animation z-10"
                      title="Account"
                    >
                      <AccountIcon classes="h-8 w-8 text-gray-500" />
                    </Button>
                  </a>
                </Link>
              </li>
            </>
          )}
        </span>
      </ul>
    </nav>
  );
}
