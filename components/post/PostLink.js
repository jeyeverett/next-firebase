import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "lib/context";

// Note that prefetching is built-in by default so no need to include it
// Next will prefetch depending on viewport size
export default function PostLink({ linkUrl, children, classes }) {
  const { updateLoading } = useContext(UserContext);

  return (
    <Link href={linkUrl}>
      <a className={classes} onClick={() => updateLoading(true)}>
        {children}
      </a>
    </Link>
  );
}
