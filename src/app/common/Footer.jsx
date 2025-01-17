"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CgHome, CgLogOut, } from "react-icons/cg";
import { UserContext } from "../contexts/user-context";

export const Footer = () => {
  const { user, setAccessToken } = useContext(UserContext);


  const handleSignout = () => {
    if (confirm("Ta garahdaa itgeltei baina uu ?")) {
      setAccessToken("");
    }
  };

    if (!user) {
      return null;
    }
  return (
    <footer className="fixed bottom-0 left-0 z-10 w-full p-4 border-t bg-background">
      <div className="flex justify-between  max-w-[430px] mx-auto w-full">
        <button onClick={handleSignout}>
          <CgLogOut size={20} />
        </button>
        <Link href={"/"}>
          <CgHome size={20} />
        </Link>
        <Link href={`/${user?.username}`}>
          <Image
            width={20}
            height={20}
            src={user?.profileUrl || "/noimage.png"}
            alt=""
            className="object-cover w-5 h-5 rounded-full"
          />
        </Link>
      </div>
    </footer>
  );
};
