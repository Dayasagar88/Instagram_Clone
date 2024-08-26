import { useState } from "react";
import Logo from "../Images/Logo-Instagram.png";
import sideBarItems from "../contants/sideBarItems.jsx";
import useLogoutHandler from "@/hooks/useLogoutHandler";
import CreatePost from "./CreatePost";

const Sidebar = () => {
  const sideBar = sideBarItems();
  const [open, setOpen] = useState(false);
  const logoutHandler = useLogoutHandler();

  const sideBarhandler = (textType) => {
    if (textType === "Logout") logoutHandler();
    if (textType === "Create") setOpen(true);
  };

  return (
    <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[18%]  h-screen">
      <div>
        <img
          src={Logo}
          className="mt-3 cursor-pointer"
          width={200}
          alt="logo"
        />
      </div>
      {sideBar.map((elem, index) => (
        <div
          key={index}
          onClick={() => sideBarhandler(elem.text)}
          className="flex gap-3 items-center relative hover:bg-gray-100 cursor-pointer py-5 rounded-md px-1"
        >
          <span>{elem.icon}</span>
          <p className={`font-semibold`}>{elem.text}</p>
        </div>
      ))}
      <CreatePost open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Sidebar;
