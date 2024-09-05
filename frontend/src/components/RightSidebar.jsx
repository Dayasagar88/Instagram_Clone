import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";

const RightSidebar = () => {
  const { user } = useSelector((store) => store?.auth);
  const  suggestedUsers  = useSelector(store => store.suggestedUsers.users);
  const navigate = useNavigate()

  const handleUserProfile = (id) => {
    navigate(`profile/${id}`)
  }


  return (
    <div className="fixed right-[10rem] mt-5 max-w-80 w-80 hidden 2xl:block ">

      {/* Logged User */}
      <div className="flex  justify-between items-center border-b pb-2">
        <div onClick={() => handleUserProfile(user._id)} className=" flex cursor-pointer items-center  gap-2">
          <Avatar>
            <AvatarImage
              className="w-10 h-10 rounded-full"
              src={user?.profilePicture}
              alt="post_image"
            />
            <AvatarFallback><i className="fa-solid fa-user"></i></AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-bold text-gray-700 text-sm">{user?.username} </h1>
            <p className="text-[.7rem] rounded-lg inline px-1 text-gray-700 bg-gray-300">
              Author
            </p>
          </div>
        </div>
        <p className="text-sm font-semibold text-blue-600  cursor-pointer">
          Switch
        </p>
      </div>

      {/* Suggested users */}
      <div>
        <div className="font-semibold flex justify-between mt-2 text-sm">
          <h1 className=" text-gray-500">Suggested for you</h1>
          <p className="cursor-pointer">See all</p>
        </div>
        {/* User list */}
        <div className="pt-1 space-y-2">
          {suggestedUsers?.map((user,index) => (
            <div key={index} className="mt-2 flex justify-between items-center" >
              <div onClick={() => handleUserProfile(user?._id)} className=" flex items-center cursor-pointer  gap-2">
              <Avatar>
              <AvatarImage
                className="w-10 h-10 rounded-full"
                src={user?.profilePicture}
                alt="post_image"
              />
              <AvatarFallback><i className="fa-solid fa-user"></i></AvatarFallback>
            </Avatar>
          
              <h1 className="font-bold text-gray-700 text-sm">{user?.username} </h1>
              </div>
              <p className="text-blue-600 font-semibold text-sm cursor-pointer">Follow</p>
          </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default RightSidebar;
