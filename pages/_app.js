import "../styles/globals.css";
import "../styles/tailwind.css";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks/useUserData";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  const [loading, setLoading] = useState(false);
  const updateLoading = (bool) => setLoading(bool);

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
