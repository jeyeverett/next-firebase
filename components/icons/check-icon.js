export default function CheckIcon({ classes }) {
  return (
    <div className="bg-white border-2 rounded-md border-gray-500 h-6 w-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-gray-700 transition-all">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${classes} h-6 w-6 opacity-0 pointer-events-none transition-opacity`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
  );
}
