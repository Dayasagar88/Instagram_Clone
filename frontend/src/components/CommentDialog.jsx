import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Dialog, DialogContent } from "./ui/dialog";
import { Link } from "react-router-dom";
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

const CommentDialog = ({ open, setOpenComments }) => {
    const [text , setText] = useState("");

     const inputChangeHandler = (e) => {
        const inputText = e.target.value;
        if(inputText.trim()){
            setText(inputText)
        }else{
            setText("");
        }
     }   

     const addCommenthandler = async () => {
        alert(text)
     }

  return (
    <Dialog open={open}>

      <DialogContent
        onInteractOutside={() => setOpenComments(false)}
        className="outline-none max-w-5xl p-0 flex flex-col h-[60%]"
      >

        <div className="flex flex-1">

          {/* Image section */}
          <div className="w-1/2 my-auto">
            <img
              className=" h-ful w-full  object-cover"
              src="https://images.unsplash.com/photo-1723920515274-ace3503adad6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
              alt="img"
            />
          </div>

          {/* Comments section   */}
          <div className="w-1/2  px-2  mt-2 relative">
            <div className="flex justify-between w-full h-8 border-b-[1px] border-gray-300">
              <Link>
                <div className="flex items-center gap-2 ">
                  <Avatar>
                    <AvatarImage
                      className="w-6 h-6 rounded-full"
                      src="https://github.com/shadcn.png"
                      alt="img"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold">Username</p>
                </div>
              </Link>
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

            <div className="flex mt-2 text-sm items-center">
              <Avatar>
                <AvatarImage
                  className="w-6 h-6 rounded-full"
                  src="https://github.com/shadcn.png"
                  alt="post_image"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="ml-1 font-semibold">Username</h1>
              <p className="ml-1">caption</p>
            </div>

            <div className="mt-5">
              <div className="flex items-center text-sm">
                <Avatar>
                  <AvatarImage
                    className="w-6 h-6 rounded-full"
                    src="https://github.com/shadcn.png"
                    alt="post_image"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="ml-1 font-semibold">Username</h1>
                <span className="ml-1">comment.......</span>
              </div>
            </div>

            <div className="absolute w-full bottom-1">

              <div className="border-t-[1px] py-3 w-[97%] border-gray-300">
                <div className="flex justify-between mt-2">
                  <div className="flex gap-2 ">
                    <Heart className="cursor-pointer hover:text-gray-600" />
                    <MessageCircle className="cursor-pointer hover:text-gray-600" />
                    <Send className="cursor-pointer hover:text-gray-600" />
                  </div>
                  <Bookmark className="cursor-pointer hover:text-gray-600" />
                </div>
                <span className="text-md font-semibold block mt-1">
                  1k likes
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
                {<button onClick={addCommenthandler} disabled={!text} className="text-blue-500  font-semibold">Post</button>}
              </div>

            </div>

          </div>

        </div>

      </DialogContent>

    </Dialog>
  );
};

export default CommentDialog;
