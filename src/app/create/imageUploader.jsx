import { CiImageOn } from "react-icons/ci";
import { CgSpinner } from "react-icons/cg";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

export const ImageUploader = ({ setMediaUrl }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();

  return (
    <div className="relative flex items-center justify-center w-full my-4 rounded aspect-square bg-slate-500">
      {!response && <CiImageOn size={40} />}
      <input
        onChange={(e) => {
          setLoading(true);
          const formData = new FormData();
          formData.append("file", e.target.files[0]);
          axios
            .post("http://localhost:3333/api/files", formData)
            .then((res) => {
              setResponse(res.data);
              setLoading(false);
              setMediaUrl(res.data.fileUrl);
            });
        }}
        type="file"
        className="absolute top-0 left-0 w-full h-full opacity-0"
        accept="image/*"
      />
      {loading && (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/80">
          <CgSpinner className="spin" size={40} />
        </div>
      )}
      {response && (
        <Image
          src={response.fileUrl}
          alt=""
          className="object-cover"
          width={20}
          height={20}
        />
      )}
    </div>
  );
};
