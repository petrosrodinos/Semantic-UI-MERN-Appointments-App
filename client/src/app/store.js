import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import businessReducer from "../features/businesses/businessSlice";
import commentReducer from "../features/businesses/comments/commentSlice";
import appointmentReducer from "../features/appointments/appointmentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    business: businessReducer,
    appointments: appointmentReducer,
    comments: commentReducer,
  },
});
