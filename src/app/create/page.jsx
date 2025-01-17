"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ImageUploader } from "./ImageUploader";
import { UserContext } from "../contexts/user-context";

const CreatePage = () => {
  const { accessToken } = useContext(UserContext);
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:3333/api/posts",
        { description, mediaUrl },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      toast.success("Amjilttai post hiilee");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Nemehed aldaa garlaa");
    }
  };

  return (
    <>
      <header className="flex justify-between p-4">
        <button onClick={() => router.back()}> &lt; </button>
        <p>New post</p>
        <button onClick={handleSubmit}>Share</button>
      </header>
      <main className="p-4">
        <ImageUploader setMediaUrl={setMediaUrl} />
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="w-full border rounded resize-none bg-background text-foreground"
        />
      </main>
    </>
  );
};

export default CreatePage;
