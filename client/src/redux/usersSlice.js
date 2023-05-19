import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        user : null,
        notifications: {
            read: [],
            unread: [],
          },
    },
    reducers: {
        SetUser: (state, action) => {
            state.user = action.payload;
        },
        SetNotifications: (state, action) => {
            state.notifications = action.payload;
          },

    }
});

export const { SetUser,SetNotifications} = usersSlice.actions;
export default usersSlice.reducer;