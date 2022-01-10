import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "lib/context";
import { auth } from "lib/firebase";
import Button from "@/util/Button";
import Loader from "@/util/Loader";
import {
  AccountIcon,
  ManageIcon,
  HomeIcon,
  AddIcon,
  LogoutIcon,
} from "@/icons";

export default function Navbar() {
  const { user, username, loading } = useContext(UserContext);
  const router = useRouter();

  return (
    <nav className="pt-2 flex justify-center relative z-10">
      <ul className="w-5/6 px-6 py-2 border border-gray-200 shadow-sm rounded-3xl flex items-center justify-between">
        <li>
          <Link href="/">
            <a>
              <Button
                classes="relative flex items-center hover:button-animation z-10"
                title="Home"
              >
                <HomeIcon classes="h-7 w-7 text-gray-500" />
              </Button>
            </a>
          </Link>
        </li>
        {username && (
          <div className="flex space-x-2 items-center">
            <li>
              <Link href="/admin/create" passHref>
                <a>
                  <Button
                    classes="relative flex items-center hover:button-animation z-10"
                    title="Create new post"
                  >
                    <AddIcon classes="h-7 w-7 text-gray-500" />
                  </Button>
                </a>
              </Link>
            </li>

            <li>
              <Link href="/admin" passHref>
                <a>
                  <Button
                    classes="relative flex items-center hover:button-animation z-10"
                    title="Manage posts"
                  >
                    <ManageIcon classes="h-7 w-7 text-gray-500" />
                  </Button>
                </a>
              </Link>
            </li>

            <li>
              <Button
                classes="relative flex items-center hover:button-animation z-10"
                title="Logout"
                onClick={() => router.push("/").then(() => auth.signOut())}
              >
                <LogoutIcon classes="h-7 w-7 text-gray-500" />
              </Button>
            </li>
          </div>
        )}

        {user && username && (
          <Link href={`/${username}`} passHref>
            <a
              className={`h-9 absolute right-5 top-3.5 flex items-center ${
                !loading && "rounded-full shadow"
              }`}
            >
              {loading ? (
                <Loader show={loading} mini={true} />
              ) : user.photoURL ? (
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
                  <AccountIcon classes="h-7 w-7 text-gray-500" />
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
                    <AccountIcon classes="h-7 w-7 text-gray-500" />
                  </Button>
                </a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
