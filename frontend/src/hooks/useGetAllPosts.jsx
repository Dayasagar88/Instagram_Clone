import { setPosts } from "@/redux/postSlice";
import { useEffect } from "react";
import { GETPOSTS_URL } from "@/api/apis";
import axios from "axios";
import { useDispatch } from "react-redux";


const useGetAllPosts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const res = await axios.get(GETPOSTS_URL, { withCredentials: true });
        if (res.data.success) {
          dispatch(setPosts(res?.data?.posts));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllPosts();
  }, []);
};
export default useGetAllPosts;
