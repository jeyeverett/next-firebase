import "styles/globals.css";
import "styles/tailwind.css";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { UserContext } from "lib/context";
import { useUserData } from "lib/hooks/useUserData";
import { useRouter } from "next/router";
import Navbar from "@/layout/Navbar";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  const [loading, setLoading] = useState(false);
  const updateLoading = (bool) => setLoading(bool);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", () => updateLoading(false));
  }, [router.events]);

  return (
    <>
      <UserContext.Provider value={{ ...userData, loading, updateLoading }}>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
