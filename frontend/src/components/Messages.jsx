import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetALlMessages from "@/hooks/useGetAllMessages";
import useGetRTM from "@/hooks/useGetRTM";

const Messages = ({ activeChatUser }) => {
  useGetRTM();
  useGetALlMessages(activeChatUser._id);
  const navigate = useNavigate();
  const { messages } = useSelector((store) => store?.chat);

  return (
    <div className="bg-gray-50 h-[85vh] overflow-y-auto">
      <div className="flex flex-col items-center pt-20">
        <Avatar className="w-24 h-24">
          <AvatarImage src={activeChatUser?.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="font-bold text-xl">{activeChatUser?.username}</p>
        <p className="text-sm font-semibold">
          {activeChatUser?.username} • <span>Instagram</span>
        </p>
        <Button
          onClick={() => navigate(`/profile/${activeChatUser._id}`)}
          className="mt-3"
        >
          View Profile
        </Button>
      </div>

      {/* Messages */}
      <div className="mt-2 px-2 space-y-2">
        {messages &&
          messages.map((message) => (
            <>
              {activeChatUser?._id === message?.receiverId ? (
                <div className="flex justify-end">
                  <p className="text-white bg-blue-600  rounded-xl pb-[2px] max-w-[50%] inline px-2 font-semibold transition-all duration-200 scale-100">
                    {message?.message}
                  </p>
                </div>
              ) : (
                <div className="flex
                ">
                  <p className="bg-gray-300 rounded-xl pb-[2px] max-w-[50%] inline px-2 font-semibold ">
                    {message?.message}
                  </p>
                </div>
              )}
            </>
          ))}
      </div>
    </div>
  );
};

export default Messages;
