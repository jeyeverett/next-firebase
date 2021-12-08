import Link from "next/link";

export default function Custom404() {
  return (
    <main className="px-6 py-6 sm:px-12 sm:py-12 flex flex-col items-center">
      <h1 className="text-2xl font-medium text-gray-700">
        404 - Sorry, we don't know where that page is...
      </h1>

      <Link href="/" passHref>
        <a>
          <button className="px-4 py-2 border border-gray-500 bg-gray-500 shadow rounded hover:bg-white text-white hover:text-gray-700 transition-all mt-4">
            Go home
          </button>
        </a>
      </Link>
    </main>
  );
}
