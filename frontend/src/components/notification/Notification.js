// src/components/Notification.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {  hideNotification } from "../../store/slices/notificationSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification.notification);

  useEffect(() => {
    if (notification) {
      switch (notification.type) {
        case "success":
          toast.success(notification.message);
          break;
        case "error":
          toast.error(notification.message);
          break;
        case "warning":
          toast(notification.message, { icon: "⚠️" });
          break;
        case "info":
          toast(notification.message, { icon: "ℹ️" });
          break;
        default:
          break;
      }

      dispatch(hideNotification());
    }
  }, [notification, dispatch]);

  return <Toaster position="top-left bor-l" reverseOrder={false} />;
};

export default Notification;
