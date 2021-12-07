import Link from "next/link";
import Image from "next/image";
import AccountIcon from "./icons/account-icon";
import HomeIcon from "./icons/home-icon";
import AddIcon from "./icons/add-icon";
import Button from "../components/Button";

export default function Navbar() {
  // { user, username } = {};
  const user = null;
  const username = null;

  return (
    <nav className="pt-2 flex justify-center">
      <ul className="w-5/6 px-6 py-2 border border-gray-200 shadow-sm rounded-3xl flex items-center justify-between">
        <li>
          <Link href="/">
            <button
              className="relative flex items-center hover:button-animation z-10"
              title="Add"
            >
              <HomeIcon classes="h-8 w-8 text-gray-500" />
            </button>
          </Link>
        </li>
        <span>
          {/* user is signed in and has a username */}
          {username && (
            <>
              <li>
                <Link href="/admin" passHref>
                  <a>
                    <Button
                      classes="relative flex items-center hover:button-animation z-10"
                      title="add post"
                    >
                      <AddIcon classes="h-8 w-8 text-gray-500" />
                    </Button>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/${username}`} passHref>
                  <img src={user?.photoURL} alt="" />
                </Link>
              </li>
            </>
          )}
          {!username && (
            <>
              <li>
                <Link href="/enter">
                  <a>
                    <Button
                      classes="relative flex items-center hover:button-animation z-10"
                      title="account"
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
