import Image from "next/image";
import PostLink from "@/post/PostLink";
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
    <nav className="pt-2 flex justify-center relative z-10 mb-4">
      <ul className="w-5/6 px-2 sm:px-6 my-0 py-2 border border-gray-200 shadow-sm rounded-3xl flex items-center justify-between">
        <li className="list-none">
          <PostLink linkUrl="/">
            <Button
              classes="relative flex items-center hover:button-animation z-10"
              title="Home"
            >
              <HomeIcon classes="h-7 w-7 text-gray-500" />
            </Button>
          </PostLink>
        </li>
        {username && (
          <div className="flex space-x-2 items-center">
            <li className="list-none">
              <PostLink linkUrl="/admin/create">
                <Button
                  classes="relative flex items-center hover:button-animation z-10"
                  title="Create new post"
                >
                  <AddIcon classes="h-7 w-7 text-gray-500" />
                </Button>
              </PostLink>
            </li>

            <li className="list-none">
              <PostLink linkUrl="/admin">
                <Button
                  classes="relative flex items-center hover:button-animation z-10"
                  title="Manage posts"
                >
                  <ManageIcon classes="h-7 w-7 text-gray-500" />
                </Button>
              </PostLink>
            </li>

            <li className="list-none">
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
          <PostLink
            linkUrl={`/${username}`}
            classes={`h-7 md:absolute right-2 md:right-5 top-4.5 flex items-center ${
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
          </PostLink>
        )}

        {!username && (
          <>
            <li>
              <PostLink linkUrl="/enter">
                <Button
                  classes="relative flex items-center hover:button-animation z-10"
                  title="Account"
                >
                  <AccountIcon classes="h-7 w-7 text-gray-500" />
                </Button>
              </PostLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
