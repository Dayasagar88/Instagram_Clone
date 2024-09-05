import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";
import axios from "axios";
import { EDIT_PROFILE_URL } from "@/api/apis";
import { setAuthUser } from "@/redux/authSlice";
import { readFileAsDataURL } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user } = useSelector((store) => store?.auth);
  const imageRef = useRef();
  const [userPhoto, setUserPhoto] = useState(user.profilePicture)
  const [input, setInput] = useState({
    bio: user?.bio,
    gender: user?.gender || null,
    profilePicture: user.profilePicture,
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, profilePicture: file });
      const imageUrl = await readFileAsDataURL(file);
      setUserPhoto(imageUrl);
    }
  };
  const selectChangeHandler = (value) => {
    setInput({ ...input, gender: value });
  };

  const handleEditProfile = async () => {
    console.log(input.profilePicture);
    const formData = new FormData();
    formData.append("bio", input.bio);
    formData.append("gender", input.gender);
    if(input.profilePicture){
      formData.append("profilePicture", input.profilePicture);
    }


    try {
      setLoading(true);
      const res = await axios.post(EDIT_PROFILE_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        withCredentials: true,
      });
      if (res.data.success) {
        console.log(res.data);
        const updatedUserData = {
          ...user,
          bio: res.data.user?.bio,
          profilePicture: res.data.user?.profilePicture,
          gender: res.data.user.gender,
        };
        dispatch(setAuthUser(updatedUserData));
        toast.success(res.data.message);
        navigate(`/profile/${user._id}`)
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" space-y-10 w-[82%] mr-0 mx-auto">
      <div className="flex flex-col gap-10 w-[80%] mx-auto">
        <h1 className="text-xl text-gray-800 font-bold pt-5">Edit Profile</h1>
        {/* Change photo */}
        <div className="flex justify-between items-center gap-2 p-3 bg-[#8c8d7d59] rounded-xl">
          <div className="flex items-center gap-2">
            <Avatar className="w-14 h-14">
              <AvatarImage src={userPhoto} />
              <AvatarFallback>
                <i className="fa-solid text-5xl fa-user"></i>
              </AvatarFallback>
            </Avatar>
            <p className="font-semibold">{user.username}</p>
          </div>
          <input
            onChange={fileChangeHandler}
            type="file"
            className="hidden"
            ref={imageRef}
          />
          <div className="space-x-1">
            <Button onClick={() => imageRef.current.click()}>
              Change photo
            </Button>
            <Button
              onClick={() => setInput({ ...input, profilePicture: "" })}
              variant="ghost"
              className="bg-red-600 hover:bg-red-700 text-white hover:text-white"
            >
              Remove Photo
            </Button>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <h1 className="text-xl text-gray-800 font-bold">Bio</h1>
          <Textarea
            defaultValue={input.bio}
            placeholder="Enter Bio here..."
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
            className="border-gray-600 focus-visible:ring-transparent rounded-xl"
          />
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <h1 className="text-xl text-gray-800 font-bold">Gender</h1>
          <Select
            defaultValue={user.gender}
            onValueChange={selectChangeHandler}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="prefer not to say">
                  Prefer not say
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleEditProfile} className="place-self-end w-56">
          {loading ? <Loader2 className=" animate-spin" /> : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;
