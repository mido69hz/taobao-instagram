"use client";
import axios from "axios";
import Link from "next/link";
import { useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/user-context";
import { redirect, useRouter } from "next/navigation";

export default function SignupPage() {
  const { user } = useContext(UserContext);
  const router = useRouter();

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
          const fullname = e.target.fullname.value;
          const username = e.target.username.value;

          axios
            .post(`${process.env.NEXT_PUBLIC_API}/signup`, {
              credential,
              password,
              fullname,
              username,
            })
            .then((res) => {
              toast.success("Та амжилттай бүртгүүллээ!");
              router.push("/signin");
            })
            .catch((err) => {
              console.error(err);
              toast.error(err.response.data.message);
            });
        }}
        className="flex flex-col gap-4"
      >
        <label className="flex flex-col">
          Credential
          <input name="credential" type="text" className="text-black" />
        </label>
        <label className="flex flex-col">
          Password
          <input name="password" type="password" className="text-black" />
        </label>
        <label className="flex flex-col">
          Full Name
          <input name="fullname" type="text" className="text-black" />
        </label>
        <label className="flex flex-col">
          Username
          <input name="username" type="text" className="text-black" />
        </label>
        <button className="text-black bg-white">Signup</button>
      </form>
      <div className="my-4">
        Already have an account? <Link href={"/signin"}>Sign in</Link>
      </div>
    </div>
  );
}
