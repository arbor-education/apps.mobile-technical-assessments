import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Notification, NotificationResponse } from "expo-notifications";

interface NotificationState {
  receivedNotification: Notification | null;
  notificationResponse: NotificationResponse | null;
}

const initialState: NotificationState = {
  receivedNotification: null,
  notificationResponse: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setReceivedNotification(state, action: PayloadAction<Notification>) {
      state.receivedNotification = action.payload;
    },
    setNotificationResponse(
      state,
      action: PayloadAction<NotificationResponse>,
    ) {
      state.notificationResponse = action.payload;
    },
    clearNotifications(state) {
      state.receivedNotification = null;
      state.notificationResponse = null;
    },
  },
});

export const {
  setReceivedNotification,
  setNotificationResponse,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
