import { createSlice } from "@reduxjs/toolkit";

const rtnSlice = createSlice({
    name : "real time notification",
    initialState : {
        likeNotification : [],
    },
    reducers : {
        setLikeNotification : (state, action) => {
            if(action.payload.type === "like"){
                state.likeNotification.push(action.payload);
            }else if(action.payload.type === "dislike"){
                state.likeNotification = state.likeNotification.filter(item => item.postId !== action.payload.postId)
            }
        }, 
        emptyLikes : (state) => {
            state.likeNotification = [];
        }
    }
});

export default rtnSlice.reducer;
export const {setLikeNotification , emptyLikes} = rtnSlice.actions;

// [1,2,3,4,5]  [3]

// [a,b,c,d,f] [c]