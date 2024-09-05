import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import {
  AtSign,
  Bookmark,
  Grid,
  Heart,
  MessageCircle,
  Settings,
  Tag,
} from "lucide-react";

const Profile = () => {
  const { id } = useParams();
  useGetUserProfile(id);
  const { userProfile } = useSelector((store) => store?.auth);
  const { user } = useSelector((store) => store?.auth);
  const posts = useSelector((store) => store?.post.posts);
  const [activeTab, setActiveTab] = useState("posts");

  const handleTabs = (tab) => {
    setActiveTab(tab);
  }; 

  const {
    username,
    profilePicture,
    followers, 
    posts: userPosts,
    following,
    bio,
    bookmarks
  } = userProfile || {};

  const filterPosts = posts.filter((post) =>
    userPosts?.some((p) => post?._id === p?._id)
  );
  const bookmarkedPosts = posts.filter(post => bookmarks?.some((p) => post?._id === p?._id))

   return (
    <div className="bg-gray-20 lg:w-[83%] max-w-[91.5%] mr-0 lg:ml-72 mx-auto">
      {/* Profile */}
      <div className="flex  items-center ml-20 gap-2">
        <div className="flex justify-center py-10 gap-20">
          <Avatar className="w-40 h-40">
            <AvatarImage src={profilePicture} />
            <AvatarFallback>
              <i className="fa-solid text-5xl fa-user"></i>
            </AvatarFallback>
          </Avatar>
          <div className="space-y-5 font-semibold">
            <div className="flex items-center justify-between gap-5">
              <p className="text-xl font-normal">{username}</p>
              {user?._id === userProfile?._id ? (
                <>
                  <Link to="/editprofile">
                    <Button variant="secondary" className="bg-gray-300">
                      Edit profile
                    </Button>
                  </Link>
                  <Button variant="secondary" className="bg-gray-300">
                    view archive
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                  >
                    Follow
                  </Button>
                  <Button variant="secondary" className="bg-gray-300">
                    Message
                  </Button>
                </>
              )}
            </div>
            <div className="flex justify-between gap-5">
              <p>
                {" "}
                <span className="font-bold">{userPosts?.length} </span>posts
              </p>
              <p>
                <span className="font-bold">{followers?.length} </span> followers
              </p>
              <p>
                <span className="font-bold">{following?.length} </span> following
              </p>
            </div>
            <div>
              <p className="font-mono text-gray-600">
                <AtSign className="inline" />
                {username?.toUpperCase()}
              </p>
              <pre className="text-sm">{bio}</pre>
            </div>
          </div>
        </div>
        <Settings className="-mt-32" />
      </div>

      {/* Stories */}
      <div className="flex items-center gap-2 px-8 py-8 border-b border-gray-400 ">
        <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[4px] rounded-full">
          <div className="bg-gray-200 w-20 h-20 rounded-full p-[3px]"></div>
        </div>
        <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[4px] rounded-full">
          <div className="bg-gray-200 w-20 h-20 rounded-full p-[3px]"></div>
        </div>
        <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[4px] rounded-full">
          <div className="bg-gray-200 w-20 h-20 rounded-full p-[3px]"></div>
        </div>
        <div className=" bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[4px] rounded-full">
          <div className="bg-gray-200 items-center justify-center flex w-20 h-20 rounded-full p-[3px]">
            <i className="fa-solid text-3xl text-gray-600 fa-plus"></i>
          </div>
        </div>
      </div>

      <div className="flex justify-center text-gray-800 gap-24 font-semibold ">
        <p
          onClick={() => {
            handleTabs("posts");
          }}
          className={`${
            activeTab === "posts" && "border-t-2 border-black font-bold"
          } py-2 flex cursor-pointer`}
        >
          <Grid /> POSTS
        </p>
        <p
          onClick={() => {
            handleTabs("saved");
          }}
          className={`${
            activeTab === "saved" && "border-t-2 border-black font-bold"
          } py-2 flex cursor-pointer`}
        >
          <Bookmark />
          SAVED
        </p>
        <p
          onClick={() => {
            handleTabs("tagged");
          }}
          className={`${
            activeTab === "tagged" && "border-t-2 border-black font-bold"
          } py-2 flex cursor-pointer`}
        >
          <Tag />
          TAGGED
        </p>
      </div>

      {/* POSTS */}
      {activeTab === "posts" && (
        <div className="grid grid-cols-3 gap-1 mx-auto justify-center lg:w-[70%] w-full px-4">
          {filterPosts.map((post, index) => (
            <div className="aspect-square relative group" key={index}>
              <img
                className="w-full h-full object-cover"
                src={post.image}
                alt=""
              />
              <div className="absolute  gap-10 justify-center items-center text-lg top-0 w-full h-full bg-[#00000048] cursor-pointer hidden group-hover:flex">
                <p className="text-white font font-semibold">
                  <Heart className="inline" /> {post.likes?.length}
                </p>
                <p className="text-white font font-semibold">
                  <MessageCircle className="inline" /> {post.comments?.length}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bookmarked posts */}
      {activeTab === "saved" && (
        <div className="grid grid-cols-3 gap-1 mx-auto justify-center lg:w-[70%] w-full px-4">
          {bookmarkedPosts.map((post, index) => (
            <div className="aspect-square relative group" key={index}>
              <img
                className="w-full h-full object-cover"
                src={post.image}
                alt=""
              />
              <div className="absolute  gap-10 justify-center items-center text-lg top-0 w-full h-full bg-[#00000048] cursor-pointer hidden group-hover:flex">
                <p className="text-white font font-semibold">
                  <Heart className="inline" /> {post.likes?.length}
                </p>
                <p className="text-white font font-semibold">
                  <MessageCircle className="inline" /> {post.comments?.length}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      

    </div>
  );
};

export default Profile;
