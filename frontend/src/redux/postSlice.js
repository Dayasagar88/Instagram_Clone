import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "posts",
    initialState: {
        posts : [],
    },
    reducers :{
        //Actions
        setPosts : (state, action) => {
            state.posts = action.payload;
        }, 
        emptyPosts : (state, action) => {
            state.posts = []
        }, 
    }
})

export const {setPosts, emptyPosts} = postSlice.actions;
export default postSlice.reducer;