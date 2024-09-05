import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import {  useNavigate } from "react-router-dom";
import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
  Smile,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

const CommentDialog = ({
  data,
  open,
  setOpenComments,
  liked,
  likeDislikeHandler,
  addCommenthandler,
}) => {
  const navigate = useNavigate()
  const [text, setText] = useState("");
  const { username, profilePicture , _id} = data.author;
  const { image, caption, comments , likes} = data;

  const inputChangeHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };
  const handleUserProfile = (id) => {
    navigate(`profile/${id}`)
  }

  return (
    <Dialog open={open}>
      <DialogTitle></DialogTitle>
      <DialogContent
        aria-describedby=""
        onInteractOutside={() => setOpenComments(false)}
        className="outline-none max-w-5xl p-0 flex flex-col h-[60%] overflow-hidden "
      >
        <div className="flex flex-1 overflow-hidden">
          {/* Image section */}
          <div className="w-1/2 my-auto">
            <img className="w-full" src={image} alt="img" />
          </div>

          {/* Comments section   */}
          <div className="w-1/2  px-2  mt-2 relative">
            <div className="flex justify-between w-full h-8 border-b-[1px] border-gray-300">
              
                <div onClick={() => handleUserProfile(_id)} className="flex cursor-pointer items-center gap-2 ">
                  <Avatar>
                    <AvatarImage
                      className="w-6 h-6 rounded-full"
                      src={profilePicture}
                      alt="img"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold">{username}</p>
                </div>
            
              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal variant="ghost" className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="p-0 gap-0 m-0">
                  <Button className="rounded-none rounded-t-md border-b-[1px] border-gray-500 text-red-600">
                    Report
                  </Button>
                  <Button className="rounded-none border-b-[1px] border-gray-500 text-red-600">
                    Unfollow
                  </Button>
                  <Button className="rounded-none border-b-[1px] border-gray-500">
                    Add to favorites
                  </Button>
                  <Button className="rounded-none border-b-[1px] border-gray-500">
                    Add to favorites
                  </Button>
                  <Button className="rounded-none border-b-[1px] border-gray-500">
                    Share to..
                  </Button>
                  <Button className="rounded-none border-b-[1px] border-gray-500">
                    Copy link
                  </Button>
                  <Button className="rounded-none border-b-[1px] border-gray-500">
                    Copy link
                  </Button>
                  <Button className="rounded-none rounded-b-md">Cancel</Button>
                </DialogContent>
              </Dialog>
            </div>

     
            <div onClick={() => handleUserProfile(_id)} className="inline-flex cursor-pointer mt-2 text-sm items-center ">
              <Avatar>
                <AvatarImage
                  className="w-6 h-6 rounded-full"
                  src={profilePicture}
                  alt="post_image"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="ml-1 font-semibold">{username}</h1>
              <p className="ml-1">{caption}</p>
            </div>
           

            <div className="mt-5 space-y-2 h-[20rem] overflow-scroll  overflow-x-hidden">
              {comments.map((comment, index) => (
                <div onClick={() => handleUserProfile(comment?.author?._id)} key={index} className="flex cursor-pointer items-center text-sm">
                  <Avatar>
                    <AvatarImage
                      className="w-6 h-6 rounded-full"
                      src={comment?.author?.profilePicture}
                      alt="post_image"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h1 className="ml-1 font-semibold">{comment?.author?.username}</h1>
                  <span className="ml-1 text-xs font-semibold text-gray-600">{comment?.text}</span>
                </div>
              ))}
            </div>

            <div className="absolute w-full bottom-1 bg-white ">
              <div className="border-t-[1px] py-3 w-[97%] border-gray-300">
                <div className="flex justify-between mt-2">
                  <div className="flex gap-2 ">
                    <div className="relative flex">
                      <Heart
                        onClick={likeDislikeHandler}
                        className={`cursor-pointer transition-scale duration-150 hover:text-gray-600 ${
                          liked ? "scale-0" : "scale-100"
                        }`}
                      />

                      <FaHeart
                        onClick={likeDislikeHandler}
                        className={`text-red-600 size-6 ${
                          liked ? "scale-100" : "scale-0"
                        } transition-scale cursor-pointer duration-150 absolute`}
                      />
                    </div>

                    <MessageCircle className="cursor-pointer hover:text-gray-600" />
                    <Send className="cursor-pointer hover:text-gray-600" />
                  </div>
                  <Bookmark className="cursor-pointer hover:text-gray-600" />
                </div>
                <span className="text-md font-semibold block mt-1">
                  {likes.length} Likes
                </span>
              </div>

              <div className="flex py-3 border-t-[1px] w-[97%] border-gray-300">
                <Smile />
                <input
                  value={text}
                  onChange={inputChangeHandler}
                  type="text"
                  placeholder="Add a comment..."
                  className="pl-2 text-sm outline-none w-[85%]"
                />
                {
                  <button
                    onClick={() => addCommenthandler(text) && setText("")}
                    disabled={!text}
                    className="text-blue-500  font-semibold"
                  >
                    Post
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
