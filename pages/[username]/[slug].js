import { firestore, getUserWithUsername, postToJSON } from "lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import PostContent from "@/post/PostContent";
import MetaTags from "@/post/MetaTags";

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
        <PostContent post={post} postRef={postRef} />
      </section>
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
