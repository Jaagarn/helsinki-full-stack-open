import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    updateNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return "";
    },
  },
});

export const { updateNotification, clearNotification } =
  notificationSlice.actions;

// I don't like this solution. But I am unsure how I could clear the timeout
// otherwise. This is an issue if you have two notifications within the 
// timeout period.
let timeOutNotification = null;

export const setNotification = (content, time) => {
  return async (dispatch) => {
    clearTimeout(timeOutNotification);
    dispatch(updateNotification(content));
    timeOutNotification = setTimeout(() => {
      dispatch(clearNotification());
    }, time);
  };
};

export default notificationSlice.reducer;
