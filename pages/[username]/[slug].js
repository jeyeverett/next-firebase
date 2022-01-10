import { firestore, getUserWithUsername, postToJSON } from "lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import PostContent from "@/post/PostContent";
import MetaTags from "@/post/MetaTags";
import { HeartIcon } from "@/icons";
import HeartButton from "@/post/HeartButton";
import AuthCheck from "@/auth/AuthCheck";
import Link from "next/link";

export default function Post({ path, post: postData }) {
  //this firebase hook lets us set up a real time datafeed to firestore
  //the page will be first server generated based on the data from getStaticProps
  //it will then hydrate its real time reactivity on the client
  //this means we will read from firestore on the server and then again on the client
  const postRef = firestore.doc(path);
  const [realTimePost] = useDocumentData(postRef);
  const post = realTimePost || postData; // hooks are not run on the server, so postData will be used

  return (
    <main>
      <section>
        <MetaTags post={post} />
        <PostContent post={post} />
      </section>

      <aside>
        <p>
          <strong>
            {post.heartCount || 0}{" "}
            <HeartIcon classes="text-red-400 h-6 w-6 mr-2" />
          </strong>
        </p>

        <AuthCheck
          fallback={
            <Link href="/enter" passHref>
              <a>
                <button className="px-4 py-2 border border-gray-500 bg-gray-500 shadow rounded hover:bg-white text-white hover:text-gray-700 transition-all mt-4">
                  <HeartIcon classes="text-red-400 h-6 w-6 mr-2" />
                  Sign Up
                </button>
              </a>
            </Link>
          }
        >
          <HeartButton postRef={postRef} />
        </AuthCheck>
      </aside>
    </main>
  );
}

export async function getStaticPaths() {
  try {
    const snapshot = await firestore.collectionGroup("posts").get();

    const paths = snapshot.docs.map((doc) => {
      const { slug, username } = doc.data();
      return { params: { username, slug } };
    });

    return {
      paths,
      fallback: "blocking",
    };
  } catch (err) {
    console.log(err);
  }
}

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection("posts").doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}
