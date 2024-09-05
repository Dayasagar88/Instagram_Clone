import { USER_PROFILE_URL } from "@/api/apis";
import { setUserProfile } from "@/redux/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";





export const useGetUserProfile = (userId) => {
    const dispatch = useDispatch()
    const getUserProfile = async(id) => {
        try {
            const res = await axios.get(USER_PROFILE_URL+`${id}/profile`, {withCredentials : true});
            if(res.data.success){
                dispatch(setUserProfile(res.data.user));
            }
        } catch (error) {
            console.log("Error " ,error)
        }
    }

    useEffect(() => {
        if(userId) getUserProfile(userId);

        return () => {
            dispatch(setUserProfile(null));
        }
    }, [userId]);
}
