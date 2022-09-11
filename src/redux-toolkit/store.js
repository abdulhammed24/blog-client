import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import commentReducer from "./slices/commentSlice";
import postReducer from "./slices/postSlices";
import usersReducer from "./slices/userSlice";
import sendMail from "./slices/emailSlices";
import accountVerification from "./slices/accountVerificationSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    category: categoryReducer,
    post: postReducer,
    comment: commentReducer,
    sendMail,
    accountVerification,
  },
});
