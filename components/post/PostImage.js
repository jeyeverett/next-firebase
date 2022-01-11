import Image from "next/image";
import { QuestionIcon, AccountIcon } from "@/icons";

export default function PostImage({ imageUrl, title, classes, userImage }) {
  return (
    <figure className={classes + " flex flex-col justify-center items-center"}>
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
      ) : userImage ? (
        <AccountIcon classes="h-32 w-32 text-gray-700" />
      ) : (
        <QuestionIcon classes="h-32 w-32 text-gray-700" />
      )}
    </figure>
  );
}
