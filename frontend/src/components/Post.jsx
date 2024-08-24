import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
  Smile,
} from "lucide-react";

import CommentDialog from "./CommentDialog";
import { useState } from "react";

const Post = () => {
 const [openComments , setOpenComments] = useState(false);
  const [text, setText] = useState("");


  const changeTextHandler = (e) => {
     const inputText = e.target.value;
     if(inputText.trim()){
        setText(inputText);
     }else{
        setText("");
     }
  };

  const addCommenthandler = async () => {
    alert(text)
  }
  return (
    <div className="my-8 w-full mx-auto">

        {/*User section  */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              className="w-6 h-6 rounded-full"
              src="https://github.com/shadcn.png"
              alt="post_image"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>Username</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent>
            <Button
              variant="ghost"
              className="cursor-pointer outline-none bg-[#999393]"
            >
              Unfollow
            </Button>
            <Button variant="ghost" className="cursor-pointer bg-[#999393]">
              Add to favorites
            </Button>
            <Button variant="ghost" className="cursor-pointer bg-[#999393]">
              Cancel
            </Button>
          </DialogContent>
        </Dialog>
      </div>

        {/* Post section */}
      <img
        className="mt-2 object-cover"
        src="https://images.unsplash.com/photo-1723920515274-ace3503adad6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
        alt="img"
      />

        {/* Like, Comment , Share */}
      <div className="flex justify-between mt-2">
        <div className="flex gap-2 ">
          <Heart className="cursor-pointer hover:text-gray-600" />
          <MessageCircle onClick={() => setOpenComments(true)} className="cursor-pointer hover:text-gray-600" />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark className="cursor-pointer hover:text-gray-600" />
      </div>
      {/* Likes */}
      <span className="text-md font-semibold block mt-1">1k likes</span>

      {/* User Caption */}
      <p className="text-sm">
        <span className="font-semibold text-sm mr-2 cursor-pointer">Username</span>
        Caption
      </p>

      {/* Show comments */}
      <span onClick={() => setOpenComments(true)} className=" cursor-pointer text-sm">View all comments...</span>

      {/* Comment dialog box */}
      <CommentDialog open={openComments} setOpenComments={setOpenComments} />


      {/* Add comment section */}
      <div className="flex justify-between">
        <input
          value={text}
          onChange={changeTextHandler}
          type="text"
          placeholder="Add a comment..."
          className="text-sm w-full
        outline-none"
        />
        {text && (
            <button onClick={addCommenthandler} className="mr-2 cursor-pointer text-[#0595d8] font-semibold">
            Post
          </button>
        )}
        <Smile className="cursor-pointer"/>
      </div>

    </div>
  );
};

export default Post;
