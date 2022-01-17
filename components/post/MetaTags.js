import Head from "next/head";

export default function MetaTags({ post }) {
  const { title, imageUrl, summary, slug, username } = post;
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content={imageUrl} />
      <meta
        name="twitter:site"
        content={`http://localhost:3000/${username}/${slug}`}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={summary} />
      <meta name="twitter:image" content={imageUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={summary} />
      <meta property="og:image" content={imageUrl} />
    </Head>
  );
}
