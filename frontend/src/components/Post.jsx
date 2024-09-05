import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Bookmark,
  CloudFog,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
  Smile,
} from "lucide-react";
import { FaHeart } from "react-icons/fa";

import CommentDialog from "./CommentDialog";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { ADDD_COMMENT_URL, BOOKMARK_POST_URL, DELETE_POST_URL, LIKE_POST_URL } from "@/api/apis";
import { DialogTitle } from "@radix-ui/react-dialog";
import { setPosts } from "@/redux/postSlice";
import { comma } from "postcss/lib/list";
import { comment } from "postcss";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "@/redux/authSlice";

const Post = ({ data }) => {
  const getUserProfile = useGetUserProfile();
  const user = useSelector((store) => store?.auth?.user);
  const posts = useSelector((store) => store?.post?.posts);
  const [openComments, setOpenComments] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(data?.likes.includes(user._id) || false);
  const [postLike, setPostLike] = useState(data?.likes?.length);
  const [comments, setComments] = useState(data?.comments);
  const [isBookmarked , setIsBookmarked] = useState(false);
  const navigate = useNavigate()

  const { profilePicture, username , _id: id} = data?.author;
  const { image, caption, _id } = data;

  const changeTextHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const addCommenthandler = async (commentText) => {
    try {
      const res = await axios.post(
        ADDD_COMMENT_URL + `${data._id}/comment`,
        { text : commentText},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );


      if (res.data.success) {
        toast.success(res?.data?.message);
        console.log(res.data);
        setText("")
        const updatedCommentData = [res.data.comment, ...comments];
        setComments(updatedCommentData);
        
        const updatedPostData = posts.map((post) => 
          post._id === data._id 
            ? { ...post, comments: updatedCommentData } 
            : post
        );        
        dispatch(setPosts(updatedPostData));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(DELETE_POST_URL + `${data._id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        const updatedPost = posts.filter((post) => post?._id !== data?._id);
        dispatch(setPosts(updatedPost));
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const likeDislikeHandler = async () => {
    try {
      const action = liked ? "/dislike" : "/like";
      const res = await axios.get(LIKE_POST_URL + `${_id}${action}`, {
        withCredentials: true,
      });
      setLiked(!liked);
      if (res.data.success) {
        if (liked) {
          setPostLike(postLike - 1);
        } else {
          setPostLike(postLike + 1);
        }

        //update the post in store
        const updatedPosts = posts.map((post) =>
          post._id === data._id
            ? {
                ...post,
                likes: liked
                  ? post.likes.filter((userId) => userId !== user._id)
                  : [...post.likes, user._id],
              }
            : post
        );
        dispatch(setPosts(updatedPosts));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  const bookmarkHandler = async (id) => {
    try {
      const res = await axios.get(BOOKMARK_POST_URL+`${id}/bookmark`, {withCredentials : true});
      if(res.data.success){
        toast.success(res.data.message);
        setIsBookmarked(!isBookmarked);       
      }
      
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }
  }
  const handleUserProfile = (id) => {
    navigate(`profile/${id}`)
  }
  

  return (
    <div className="my-8 w-full mx-auto">
      {/*User section  */}
      <div className="flex items-center justify-between">
        <div onClick={() => handleUserProfile(id)} className="flex cursor-pointer items-center gap-2">
          <Avatar>
            <AvatarImage
              className="w-6 h-6 rounded-full"
              src={profilePicture}
              alt="post_image"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="font-semibold text-sm">
            {username}{" "}
            {user.username === username && (
              <span className="text-[.7rem] rounded-lg px-1 text-gray-700 bg-gray-300">
                Author
              </span>
            )}
          </h1>
        </div>
        <Dialog open={open}>
          <DialogTitle className="hidden"></DialogTitle>
          <DialogTrigger asChild>
            <MoreHorizontal
              onClick={() => {
                setOpen(true);
              }}
              className="cursor-pointer"
            />
          </DialogTrigger>
          <DialogContent
            onInteractOutside={() => setOpen(false)}
            aria-describedby=""
            className="p-0 gap-0 overflow-hidden"
          >
            {user.username !== username && (
              <Button
                variant="ghost"
                className="text-red-600 border-b rounded-none cursor-pointer bg-[#999393]"
              >
                Report
              </Button>
            )}

            {user.username !== username && (
              <Button
                variant="ghost"
                className="cursor-pointer border-b text-red-600 rounded-none bg-[#999393]"
              >
                Unfollow
              </Button>
            )}
            <Button
              variant="ghost"
              className="cursor-pointer border-b rounded-none bg-[#999393]"
            >
              Add to favorites
            </Button>
            {user.username === username && (
              <Button
                onClick={deletePostHandler}
                variant="ghost"
                className="cursor-pointer rounded-none bg-[#999393]"
              >
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Post section */}
      <img className="mt-2 object-cover" src={image} alt="img" />

      {/* Like, Comment , Share */}
      <div className="flex justify-between mt-2">
        <div className="flex gap-2 ">
          <div className="relative flex">
            <Heart
              onClick={likeDislikeHandler}
              className={`cursor-pointer transition-scale duration-200 hover:text-gray-600 ${
                liked ? "scale-0" : "scale-100"
              }`}
            />

            <FaHeart
              onClick={likeDislikeHandler}
              className={`text-red-600 size-6 ${
                liked ? "scale-100" : "scale-0"
              } transition-scale cursor-pointer duration-200 absolute`}
            />
          </div>

          <MessageCircle
            onClick={() => setOpenComments(true)}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <div className=" relative flex items-center justify-center">
          {
            <>
            <Bookmark onClick={() => bookmarkHandler(_id)} className={`cursor-pointer hover:text-gray-600 ${isBookmarked ? "scale-0" : "scale-100"} transition-scale duration-300`} />
            <i onClick={() => bookmarkHandler(_id)} className={`fa-solid absolute cursor-pointer text-xl fa-bookmark ${isBookmarked ? "scale-100" : "scale-0"} transition-scale duration-300`}></i>
            </>
            
          }
        
        </div>
       
          
      </div>
      {/* Likes */}
      <span className="text-md font-semibold block mt-1">{postLike} Likes</span>

      {/* User Caption */}
      <p className=" text-xs font-semibold text-gray-600">
        <span onClick={() => handleUserProfile(id)} className="font-semibold text-sm mr-1 text-black cursor-pointer">
          {username}
        </span>
        {caption}
      </p>

      {/* Show comments */}
      {comments.length > 1 && <span
        onClick={() => setOpenComments(true)}
        className=" cursor-pointer text-sm"
      >
        View  all {comments?.length} comments...
      </span> 
      }
      {
      comments.length === 1 && <span
        onClick={() => setOpenComments(true)}
        className=" cursor-pointer text-sm"
      >
        View comment
      </span> 
      }

      {/* Comment dialog box */}
      <CommentDialog
        addCommenthandler={addCommenthandler}
        likeDislikeHandler={likeDislikeHandler}
        liked={liked}
        data={data}
        open={openComments}
        setOpenComments={setOpenComments}
      />

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
          <button
            onClick={() => addCommenthandler(text)}
            className="mr-2 cursor-pointer text-[#0595d8] font-semibold"
          >
            Post
          </button>
        )}
        <Smile className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Post;
