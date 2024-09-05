import { useEffect } from "react";

import { SUGGESTED_USER_URL } from "@/api/apis";
import axios from "axios";
import { setSuggestedUser } from "@/redux/suggestedUserSlice";
import { useDispatch } from "react-redux";

const useSuggestedUser = () => {
    const dispatch = useDispatch()
  const getSuggestedUser = async () => {
    try {
      const res = await axios.get(SUGGESTED_USER_URL, {withCredentials : true});
      if (res.data.success) {
        dispatch(setSuggestedUser(res?.data?.users))
      }
    } catch (error) {
      console.log("Error : ",error);
    }
  };

  useEffect(() => {
    getSuggestedUser();
  },[])
};
export default useSuggestedUser;
