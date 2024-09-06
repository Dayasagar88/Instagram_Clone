import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import messageLogo from "../assets/Images/message_logo.png";
import { Camera, Edit, Info, Phone, Send, Smile, Video } from "lucide-react";
import Messages from "./Messages";
import axios from "axios";
import { SEND_MSG_URL } from "@/api/apis";
import { toast } from "sonner";
import { setMessages } from "@/redux/chatSlice";
import MobileChatScreen from "./MobileChatScreen";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const navigate = useNavigate()
  const { user } = useSelector((store) => store?.auth);
  const { users } = useSelector((store) => store?.suggestedUsers);
  const { onlineUsers, messages } = useSelector((store) => store?.chat);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [textMessage, setTextMessage] = useState("");
  const dispatch = useDispatch();

  let filterUser;
  const handleChatPage = (userId) => {
    filterUser = users.find((user) => user._id === userId);
    setActiveChatUser(filterUser);
    setIsChatOpen(false);
  };

  const handleChatPageForMobile = (id) => {
      navigate(`/chat/messages/${id}`);
  }

  const sendMessageHandler = async (receiverId) => {
    try {
      const res = await axios.post(
        SEND_MSG_URL + `/${receiverId}`,
        { textMessage },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setMessages([...messages, res?.data?.newMessage]));
        console.log(res.data);
        setTextMessage("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full flex sm:justify-end h-screen">


      <div className="lg:w-[84%] sm:w-[92%] w-full flex">
        {/* Chats */}
        <div className="sm:border-r  sm:w-[25rem] w-full font-bold">
          <div className="flex items-center justify-between">
            <h1 className="text-xl p-2">{user.username}</h1>
            <Edit className="mr-2" />
          </div>
          <h1 className="text-gray-800 p-2  mt-8">Messages</h1>
          <div className="">
            {users.map((user, index) => (
              <div

              onClick={() => {
                if (window.innerWidth <= 600) {
                  // Mobile screen size
                  handleChatPageForMobile(user._id);
                } else {
                  // Larger screen size
                  handleChatPage(user._id);
                }
              }}
                key={index}
                className="flex justify-between gap-2 p-2 cursor-pointer hover:bg-gray-100 items-center"
              >
                <div className="flex items-center gap-2">
                  <div className=" relative">
                    <Avatar className="w-14 h-14 relative">
                      <AvatarImage src={user.profilePicture} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {onlineUsers?.includes(user._id) && (
                      <div className="absolute flex items-center justify-center bottom-1 right-0 w-4 h-4 rounded-full bg-white">
                        <div className="w-3 h-3 rounded-full bg-green-600"></div>
                      </div>
                    )}
                  </div>
                  <p>{user.username}</p>
                </div>

                <Camera />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden w-full sm:flex">
          {/* Chat page */}
          {isChatOpen ? (
            <div className="flex flex-1  text-center items-center justify-center">
              <div>
                <img
                  className="mx-auto rounded-full w-40 h-40"
                  src={messageLogo}
                  alt=""
                />
                <h1 className="text-xl font-semibold">Your messages</h1>
                <p className="font-semibold text-gray-600">
                  Send private photos and messages to a friend or group.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 relative">
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
                className="bg-gray-50 relative flex items-center  p-2 box-border
           w-full"
              >
                <input
                  value={textMessage}
                  onChange={(e) => setTextMessage(e.target.value)}
                  type="text"
                  className="border outline-none px-12 p-3 rounded-full box-border w-full"
                  placeholder="Message..."
                />
                <button
                  disabled={!textMessage}
                  onClick={() => sendMessageHandler(activeChatUser?._id)}
                  className=" absolute font-semibold cursor-pointer text-blue-600 right-6"
                >
                  <Send className="text-black" />
                </button>
                <Smile className=" absolute left-4" />
              </div>
            </div>
          )}
        </div>
      </div>


      <MobileChatScreen
        setTextMessage={setMessages}
        textMessage={textMessage}
        sendMessageHandler={sendMessageHandler}
      />

    </div>
  );
};

export default ChatPage;
