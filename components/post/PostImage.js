import Image from "next/image";
import Link from "next/link";
import { QuestionIcon } from "@/icons";

export default function PostImage({ imageUrl, title, classes, postLink }) {
  console.log(imageUrl);
  return (
    <figure className="flex flex-col justify-center items-center md:mr-6">
      {imageUrl ? (
        <Link href={postLink}>
          <a>
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
          </a>
        </Link>
      ) : (
        <Link href={postLink}>
          <a>
            <QuestionIcon classes="h-32 w-32 text-gray-700" />
          </a>
        </Link>
      )}
    </figure>
  );
}
