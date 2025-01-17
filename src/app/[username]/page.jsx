"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user-context";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { CiCamera } from "react-icons/ci";
import { CgSpinner } from "react-icons/cg";

const Page = () => {
  const [profileUrl, setProfileUrl] = useState();
  const { username } = useParams();
  const [uploading, setUploading] = useState(false);
  const { user: currentUser, accessToken } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3333/api/users/" + username).then((res) => {
      setUser(res.data);
    });
  }, [username]);

  useEffect(() => {
    if (user !== null) {
      axios
        .get("http://localhost:3333/api/posts/user/" + user._id)
        .then((res) => {
          setPosts(res.data);
        })
        .catch(() => {
          setPosts([]);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user && currentUser) {
      const result = user.followers.some((follower) => {
        return follower.follower === currentUser._id;
      });
      setIsFollowed(result);
    }
  }, [user, currentUser]);

  const handleFollow = () => {
    axios
      .post(
        "http://localhost:3333/api/users/follow",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((res) => {
        setIsFollowed(res.data.followed);
        toast.success(res.data.message);
      });
  };

  if (!user) return null;

  const isOwner = currentUser._id === user._id;

  const onImageUpload = (e) => {
    setUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(`http://localhost:3333/api/users/${username}/image`, formData, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        setProfileUrl(res.data.profileUrl);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message || "Зураг солиход алдаа гарлаа"
        );
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <>
      <div className="px-4">
        <div className="flex gap-4">
          <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden group">
            {profileUrl ? (
              <Image
                alt=""
                src={profileUrl}
                width={100}
                height={100}
                className="border w-[100px] h-[100px] rounded-full object-cover"
              />
            ) : (
              <Image
                alt=""
                src={user.profileUrl}
                width={100}
                height={100}
                className="border w-[100px] h-[100px] rounded-full object-cover"
              />
            )}

            {uploading && (
              <div className="absolute top-0 left-0 z-10 grid w-full h-full bg-black/50 place-items-center">
                <CgSpinner className="text-white spin" size={24} />
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center invisible transition-all duration-300 opacity-0 cursor-pointer bg-black/30 h-1/3 group-hover:opacity-100 group-hover:visible">
              <input
                onChange={onImageUpload}
                type="file"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
              <CiCamera size={24} />
            </div>
          </div>
          <div>
            <h1 className="flex gap-4 text-2xl font-bold">
              {user.username}
              {!isOwner && (
                <button onClick={handleFollow}>
                  {isFollowed ? "Unfollow" : "Follow"}
                </button>
              )}
            </h1>
            {isOwner && (
              <div>
                <button>Edit profile</button>
              </div>
            )}
            <div>
              {user.fullname} <br />
              {user.bio}
            </div>
            <div className="flex gap-4">
              <div>{user.posts.length} Posts</div>
              <div>{user.followers.length} Followers</div>
              <div>{user.followings.length} Following</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3">
          {posts.map((post) => (
            <div key={post._id}>
              <Image
                src={post.mediaUrl}
                alt={post.description}
                width={300}
                height={300}
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
