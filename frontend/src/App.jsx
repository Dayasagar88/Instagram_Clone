import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup";
import MainLayout from "./components/MainLayout";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Home from "./components/Home";
import EditProfile from "./components/EditProfile";
import ChatPage from "./components/ChatPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/chatSlice";
import { setLikeNotification } from "./redux/rtnSlice";
import ProtectedRoutes from "./components/ProtectedRoutes";
import MobileChatScreen from "./components/MobileChatScreen";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes> <MainLayout /></ProtectedRoutes>,
    children: [
      {
        path: "/",
        element: <ProtectedRoutes> <Home /></ProtectedRoutes>,
      },
      {
        path: "/profile/:id",
        element: <ProtectedRoutes> <Profile/></ProtectedRoutes>,
      },
      {
        path: "editprofile",
        element: <ProtectedRoutes> <EditProfile /></ProtectedRoutes>,
      },
      {
        path: "chat",
        element: <ProtectedRoutes> <ChatPage /></ProtectedRoutes>,
      },
      {
        path: "chat/messages/:id",
        element : <ProtectedRoutes><MobileChatScreen/></ProtectedRoutes> 
      }
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  const {user} = useSelector((store) => store?.auth);
  const { socket } = useSelector(store => store.socketio);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socketio = io("http://localhost:8000", {
        query: {
          userId: user?._id,
        },
        transports: ["websocket"],
      });
      dispatch(setSocket(socketio));

      //Listen all events
      socketio.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      socketio.on("notification", (notification) => {
        dispatch(setLikeNotification(notification))
      })

      return () => {
        socketio.close();
        dispatch(setSocket(null));
        dispatch(setOnlineUsers([]))
      };
    } else if(socket){
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;
