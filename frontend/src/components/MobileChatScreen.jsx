import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Info, Phone, Send, Smile, Video } from "lucide-react";
import Messages from "./Messages";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const MobileChatScreen = ({
  setTextMessage,
  textMessage,
  sendMessageHandler,
}) => {


  const { id } = useParams();
  const { users } = useSelector((store) => store?.suggestedUsers);
  const activeChatUser = users.find((user) => user._id === id);


  return (
    activeChatUser && (
      <div className="flex-1 relative sm:hidden h-[90vh]">
        {/* Herader */}
        <div className="inline-flex justify-between items-center w-full border-b-[1px]  p-3">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={activeChatUser?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-semibold">{activeChatUser?.username}</p>
          </div>
          <div className="flex gap-2">
            <Phone />
            <Video />
            <Info />
          </div>
        </div>

        {/* Messages area */}
        <Messages activeChatUser={activeChatUser} />

        {/* Message box */}
        <div
          className="bg-gray-50 relative flex  items-center  p-2 box-border
           w-full"
        >
          <input
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            type="text"
            className="border outline-none  px-12 p-3 rounded-full box-border w-full"
            placeholder="Message..."
          />
          <button
            disabled={!textMessage}
            onClick={() => sendMessageHandler(activeChatUser?._id)}
            className=" absolute font-semibold  cursor-pointer text-blue-600 right-6"
          >
            <Send className="text-black" />
          </button>
          <Smile className=" absolute left-4" />
        </div>
      </div>
    )
  );
};

export default MobileChatScreen;
