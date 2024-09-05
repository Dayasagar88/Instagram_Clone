import { createSlice } from "@reduxjs/toolkit";

const suggestedUser = createSlice({
    name : "suggested users",
    initialState : {
        users : [],
    },
    reducers : {
        //Actions
        setSuggestedUser : (state , action ) => {
            state.users = action.payload;
        }
    }
})

export default suggestedUser.reducer;
export const {setSuggestedUser} = suggestedUser.actions