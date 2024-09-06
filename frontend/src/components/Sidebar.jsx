import { useState } from "react";
import Logo from "../assets/Images/Logo-Instagram.png";
import sideBarItems from "../contants/sideBarItems.jsx";
import useLogoutHandler from "@/hooks/useLogoutHandler";
import CreatePost from "./CreatePost";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import instaLogo from "../assets/Images/instalogo.jpg";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Sidebar = () => {
  const user = useSelector((store) => store?.auth?.user);
  const { likeNotification } = useSelector((store) => store?.rtn);
  const navigate = useNavigate();
  const sideBar = sideBarItems();
  const [open, setOpen] = useState(false);
  const logoutHandler = useLogoutHandler();
  const {id} = useParams();

  const sideBarhandler = (textType) => {
    if (textType === "Logout") logoutHandler();
    if (textType === "Create") setOpen(true);
    if (textType === "Profile") {
      navigate(`profile/${user._id}`);
    }
    if (textType === "Home") navigate("/");
    if (textType === "Messages") navigate("/chat");
  };

  const hideSidebarRoutes = [`/chat/messages/${id}`];
  const location = useLocation();
  

  return (
    <div className="">
      <div className="fixed hidden sm:block top-0 z-10 left-0 px-4 border-r border-gray-300 max-w-[18%] space-y-5  h-screen">
        <div className="">
          <img
            src={Logo}
            className="mt-3 mx-auto cursor-pointer hidden lg:block"
            width={200}
            alt="logo"
          />
          <img
            src={instaLogo}
            className="mt-10 mb-14 mx-auto  w-12 cursor-pointer lg:hidden block"
            width={200}
            alt="logo"
          />
        </div>

        {sideBar.map((elem, index) => (
          <div
            key={index}
            onClick={() => sideBarhandler(elem.text)}
            className="flex gap-3 items-center relative hover:bg-gray-100 cursor-pointer p-3 rounded-md "
          >
            <span>{elem.icon}</span>
            <p className={`font-semibold hidden lg:block`}>{elem.text}</p>
            {elem.text === "Notification" && likeNotification.length > 0 ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="icon" className="rounded-full absolute max-h-5 max-w-5 hover:bg-red-600 bg-red-600 top-2 left-6">{likeNotification?.length}</Button>
                </PopoverTrigger>
                <PopoverContent className="space-y-2">
                  {
                    likeNotification.length === 0 ? (<p>No new notification</p>) : (
                      likeNotification.map(notification => {
                        return <div key={notification._id} className="flex items-center gap-1">
                          <Avatar>
                            <AvatarImage src={notification?.userDetails?.profilePicture}/>
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <p className="text-sm font-semibold">{notification?.userDetails?.username} <span className="font-normal">liked your post</span></p>
                        </div>
                      })
                    )
                  }
                </PopoverContent>
              </Popover>
            ) : (
              ""
            )}
          </div>
        ))}

        <CreatePost open={open} setOpen={setOpen} />
      </div>


     {!hideSidebarRoutes.includes(location.pathname) &&  <div className="fixed flex bottom-0 z-10 bg-white w-full justify-between sm:hidden">
      {sideBar.map((elem, index) => (
          <div
            key={index}
            onClick={() => sideBarhandler(elem.text)}
            className="flex gap-3 items-center relative hover:bg-gray-100 cursor-pointer p-3 rounded-md "
          >
            <span>{elem.icon}</span>
            <p className={`font-semibold hidden lg:block`}>{elem.text}</p>
            {elem.text === "Notification" && likeNotification.length > 0 ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="icon" className="rounded-full absolute max-h-5 max-w-5 hover:bg-red-600 bg-red-600 top-2 left-6">{likeNotification?.length}</Button>
                </PopoverTrigger>
                <PopoverContent className="space-y-2">
                  {
                    likeNotification.length === 0 ? (<p>No new notification</p>) : (
                      likeNotification.map(notification => {
                        return <div key={notification._id} className="flex items-center gap-1">
                          <Avatar>
                            <AvatarImage src={notification?.userDetails?.profilePicture}/>
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <p className="text-sm font-semibold">{notification?.userDetails?.username} <span className="font-normal">liked your post</span></p>
                        </div>
                      })
                    )
                  }
                </PopoverContent>
              </Popover>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>}
    </div>
  );
};

export default Sidebar;
