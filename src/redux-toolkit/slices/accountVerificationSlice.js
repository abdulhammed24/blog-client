import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/baseURL";

//action for redirect
const resetAcc = createAction("account/verify-reset");

//create verification token
export const accVerificationSendToken = createAsyncThunk(
  "account/token",
  async (email, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.post(
        `${baseUrl}/users/generate-verify-email-token`,
        {},
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Verify Account
export const verifyAccount = createAsyncThunk(
  "account/verify",
  async (token, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        `${baseUrl}/users/verify-account`,
        { token },
        config
      );
      //dispatch
      dispatch(resetAcc());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slices

const accountVerificationSlices = createSlice({
  name: "account",
  initialState: {},
  extraReducers: (builder) => {
    //create
    builder.addCase(accVerificationSendToken.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(accVerificationSendToken.fulfilled, (state, action) => {
      state.token = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(accVerificationSendToken.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //Verify account
    builder.addCase(verifyAccount.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetAcc, (state, action) => {
      state.isVerified = true;
    });
    builder.addCase(verifyAccount.fulfilled, (state, action) => {
      state.verified = action?.payload;
      state.loading = false;
      state.isVerified = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(verifyAccount.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default accountVerificationSlices.reducer;
