import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
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
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notification" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage className="rounded-full" src={profilePicture} />
          <AvatarFallback><i className="fa-solid text-sm fa-user"></i></AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut />, text: "Logout" },
  ];

  return sideBar;
};

export default sideBarItems;
