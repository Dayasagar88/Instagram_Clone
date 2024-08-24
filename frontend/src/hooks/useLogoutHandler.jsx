import { LOGOUT_URL } from "@/api/apis";
import { setAuthUser } from "@/redux/authSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useLogoutHandler = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(LOGOUT_URL , {withCredentials : true});
      if (res.data.success) {
        navigate("/login");
        dispatch(setAuthUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return logoutHandler;
};

export default useLogoutHandler;
