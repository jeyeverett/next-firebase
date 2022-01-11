import Image from "next/image";
import { QuestionIcon } from "@/icons";

export default function PostImage({ imageUrl, title, classes }) {
  return (
    <figure className="flex flex-col justify-center items-center">
      {imageUrl ? (
        <div className="w-32 relative">
          <Image
            src={imageUrl}
            alt={title}
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="cover"
            className="border rounded"
          />
        </div>
      ) : (
        <QuestionIcon classes="h-32 w-32 text-gray-700" />
      )}
    </figure>
  );
}
