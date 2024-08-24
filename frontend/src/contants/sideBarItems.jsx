import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import { useSelector } from "react-redux";

const sideBarItems = () => {
  const profilePicture = useSelector(
    (store) => store?.auth?.user?.profilePicture
  );

  const sideBar = [
    { icon: <Home />, text: " Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notification" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar>
          <AvatarImage className="rounded-full w-6 h-6" src={profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut />, text: "Logout" },
  ];

  return sideBar;
};

export default sideBarItems;
