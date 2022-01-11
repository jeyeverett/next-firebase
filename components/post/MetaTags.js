import Head from "next/head";

export default function MetaTags({ post }) {
  const { title, description, image, summary, site } = post;
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content={summary} />
      <meta name="twitter:site" content={site} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" contnet={title} />
      <meta property="og:description" contnet={description} />
      <meta property="og:image" contnet={image} />
    </Head>
  );
}
