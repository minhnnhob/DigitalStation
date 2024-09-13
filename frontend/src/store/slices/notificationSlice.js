
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notification:null,
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showNotification(state, action) {
            state.notification = action.payload;
        },
        hideNotification(state, action) {
            state.notification = null;
        }
    }
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;