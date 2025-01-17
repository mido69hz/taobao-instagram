"use client";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/user-context";
import axios from "axios";

import { PostCard } from "./common/PostCard";

export default function Home() {
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3333/api/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  if (!user) {
    return redirect("/signin");
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-4">
        {posts
          .filter((post) => Boolean(post.mediaUrl))
          .map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
      </ul>
    </>
  );
}
