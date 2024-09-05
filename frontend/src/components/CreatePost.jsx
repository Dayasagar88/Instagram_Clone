import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import React, { useRef, useState } from "react";
import CreatePostImg from "..assets/Images/Post.png";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { readFileAsDataURL } from "@/lib/utils";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { NEWPOST_URL } from "../api/apis";
import { setPosts } from "@/redux/postSlice";
import { DialogTitle } from "@radix-ui/react-dialog";

const CreatePost = ({ open, setOpen }) => {
  const user = useSelector((store) => store?.auth?.user);
  const posts = useSelector((store) => store?.post?.posts);
  const [post, setPost] = useState(null);
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const imageRef = useRef();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const postHandler = async (e) => {
    e.preventDefault();
    const file = e?.target?.files?.[0];
    if (file) {
      setFile(file);
      const imageUrl = await readFileAsDataURL(file);
      setPost(imageUrl);
    }
  };

  const createPostHandler = async () => {
    const formData = new FormData();
    formData.append("caption", caption);
    if (post) formData.append("image", file);
    try {
      setLoading(true);
      const res = await axios.post(NEWPOST_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts,]));
        toast.success(res.data.message);
        setOpen(false);
        setCaption("");
        setPost(null);
      }
    } catch (error) {
      console.log("error ", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle></DialogTitle>
      <DialogContent
        aria-describedby=""
        onInteractOutside={() => {
          setOpen(false);
          setPost(null);
          setCaption("");
        }}
        className="p-0 outline-none "
      >
        <DialogHeader className="font-semibold mt-2 text-lg mx-auto">
          Create new post
        </DialogHeader>
        <hr className="bg-black" />
        <div className="px-2">
          <div className="flex items-center gap-2">
            <Avatar className="w-7 h-7">
              <AvatarImage src={user?.profilePicture} alt="img" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-sm font-semibold">{user?.username}</p>
          </div>

          <div className=" relative aspect-square flex gap-2 flex-col justify-center items-center">
            {post && (
              <X
                onClick={() => {
                  setPost(null);
                }}
                className=" absolute top-0 right-0 rounded-full cursor-pointer bg-gray-300 hover:bg-slate-400"
              />
            )}
            {!post ? (
              <img
                className="object-contain rounded-lg"
                src={CreatePostImg}
                alt="img"
              />
            ) : (
              <img
                className="object-contain w-full max-h-full"
                src={post}
                alt="img"
              />
            )}
            {!post && <p className="text-lg font-semibold">Drag photos here</p>}
            {!post && (
              <Button className="" onClick={() => imageRef.current.click()}>
                Choose From Computer
              </Button>
            )}
            <input
              ref={imageRef}
              onChange={postHandler}
              type="file"
              className="hidden"
            />
          </div>

          <Textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="mb-2 focus-visible:ring-transparent"
            placeholder="Add caption..."
          />
          {post && (
            <Button onClick={createPostHandler} className="mb-2 w-full">
              {loading ? <Loader2 className=" animate-spin" /> : "Post"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
