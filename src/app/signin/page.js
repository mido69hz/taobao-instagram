"use client";
import axios from "axios";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../contexts/user-context";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";

export default function SigninPage() {
  const { user, setAccessToken } = useContext(UserContext);

  if (user) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const credential = e.target.credential.value;
          const password = e.target.password.value;

          axios
            .post(`${process.env.NEXT_PUBLIC_API}/signin`, {
              credential,
              password,
            })
            .then((res) => {
              toast.success("Амжилттай нэвтэрлээ");
              setAccessToken(res.data.accessToken);
            })
            .catch((err) => {
              toast.error("nevtrehd aldaa garlaa");
            });
        }}
        className="flex flex-col gap-4 border border-[#363636] w-[350px] h-[327px] justify-center items-center"
      >
        <Image
          src="/image.png"
          alt=""
          width={175}
          height={51}
          className="bg-transparent"
        />
        <label className="flex flex-col w-[266px] h-[36px] border border-[#363636] rounded justify-center">
          <input
            name="credential"
            type="text"
            className="text-white bg-[#1A1A1A] overflow-full bg-cover h-[36px] p-2"
            placeholder="Phone number, username, or email"
          />
        </label>
        <label className="flex flex-col w-[266px] h-[36px] border border-[#363636] rounded justify-center ">
          <input
            name="password"
            type="password"
            className="text-white bg-[#1A1A1A] bg-cover h-[36px] p-2"
            placeholder="Password"
          />
        </label>
        <button className="text-black  w-[268px] h-[32px] mt-2 mb-2 rounded-lg bg-[#007bfc] text-white text-lg font-bold">
          Log in
        </button>
      </form>
      <div className="my-4 w-[350px] border text-center py-3 border-[#363636]">
        Don&rsquo;t have an account?{" "}
        <Link
          href={"/signup"}
          className="font-bold text-[#0095F6] hover:underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
