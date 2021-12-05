import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link
        href={{
          pathname: "/[username]",
          query: { username: "jeysen" },
        }}
      >
        <a>User Profile</a>
      </Link>
    </div>
  );
}
