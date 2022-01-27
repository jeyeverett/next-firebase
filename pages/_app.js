import "styles/globals.css";
import "styles/tailwind.css";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { UserContext } from "lib/context";
import { useUserData } from "lib/hooks/useUserData";
import { useRouter } from "next/router";
import Navbar from "@/layout/Navbar";

// boilerplate - shown on all pages and maintains state across pages
function MyApp({ Component, pageProps }) {
  const userData = useUserData(); // returns { user, username }

  // Manage a globally reactive loading spinner
  const [loading, setLoading] = useState(false);
  const updateLoading = (bool) => setLoading(bool);

  const router = useRouter();

  // disable loading spinner on every page load
  useEffect(() => {
    router.events.on("routeChangeComplete", () => updateLoading(false));
  }, [router.events]);

  return (
    <>
      <UserContext.Provider value={{ ...userData, loading, updateLoading }}>
        <Navbar />
        <Component {...pageProps} />
        <Toaster reverseOrder={true} />
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
