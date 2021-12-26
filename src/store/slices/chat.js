/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addChat, doesChatUserExist, getChats } from '../../services';

const initialState = {
  docs: [],
  loading: true,
  error: '',
};
export const requestLoadChats = createAsyncThunk(
  'chat/requestLoadChats',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await getChats(userId);
      const docs = [];
      if (res.size > 0) {
        res.docs.forEach((doc) => docs.push({ id: doc.id, ...doc.data() }));
      }
      return docs;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const requestCreateChat = createAsyncThunk(
  'chat/requestCreateChat',
  async (chatData, { rejectWithValue, dispatch }) => {
    try {
      const { userEmail, chatUserEmail, userId } = chatData;
      const res = await doesChatUserExist({ chatUserEmail, userId });
      // Reject if chat user already exists;
      if (res.size > 0) {
        return rejectWithValue('User already exists');
      }
      // Else add the user to database
      const response = await addChat({ userEmail, userId, chatUserEmail });
      // Dispatch loadChats to populate the UI
      dispatch(requestLoadChats(userEmail));
      return response;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);
export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  extraReducers: {
    [requestLoadChats.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [requestLoadChats.fulfilled]: (state, action) => {
      state.docs = action.payload;
      state.loading = false;
    },
    [requestLoadChats.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default chatSlice.reducer;
