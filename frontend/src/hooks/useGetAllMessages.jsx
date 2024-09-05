import { GET_ALL_MSG_URL } from "@/api/apis";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setMessages } from "@/redux/chatSlice";
import { useEffect } from "react";

const useGetALlMessages = (id) => {
  const dispatch = useDispatch();


  const getAllMessages = async (id) => {
    try {
        const res = await axios.get(GET_ALL_MSG_URL + `/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setMessages(res.data.messages));
        }
      } catch (error) {
        console.log( "Error :", error);
      }
  }

  useEffect(() => {
    getAllMessages(id)
  }, [id])

};

export default useGetALlMessages;
