import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../contexts/user-context";

export const Header = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 p-4 border-b bg-background">
      <div className="flex justify-between max-w-[430px] mx-auto w-full">
        <Link href={"/"}>
          <Image
            src="/image.png"
            alt=""
            width={105}
            height={51}
            className="bg-transparent"
          />
        </Link>
        <Link href={"/create"}>
          <svg
            aria-label="New post"
            className="x1lliihq x1n2onr6 x5n08af"
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <title>New post</title>
            <path
              d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="6.545"
              x2="17.455"
              y1="12.001"
              y2="12.001"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="12.003"
              x2="12.003"
              y1="6.545"
              y2="17.455"
            ></line>
          </svg>
        </Link>
      </div>
    </header>
  );
};
