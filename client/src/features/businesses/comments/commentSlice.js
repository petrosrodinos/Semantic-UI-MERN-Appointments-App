import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "./commentService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createComment = createAsyncThunk(
  "create/comment",
  async (comment, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.createComment(comment, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchComments = createAsyncThunk(
  "fetch/comments",
  async (id, thunkAPI) => {
    try {
      return await commentService.fetchComments(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchUserComments = createAsyncThunk(
  "fetch/comment",
  async (id, thunkAPI) => {
    try {
      return await commentService.fetchUserComments(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "delete/comment",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.deleteComment(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const businessCommentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.Error = true;
        state.message = action.payload;
      })
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.Error = true;
        state.message = action.payload;
      })
      .addCase(fetchUserComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(fetchUserComments.rejected, (state, action) => {
        state.isLoading = false;
        state.Error = true;
        state.message = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.Error = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = businessCommentSlice.actions;
export default businessCommentSlice.reducer;
