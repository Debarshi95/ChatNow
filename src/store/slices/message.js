/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addMessage, getMessages } from '../../services';

export const requestLoadMessages = createAsyncThunk(
  'message/loadMessage',
  async (chatId, { rejectWithValue }) => {
    try {
      const res = await getMessages(chatId);
      const docs = [];
      if (res.size > 0) {
        res.docs.forEach((doc) => docs.push({ id: doc.id, ...doc.data() }));
      }
      return docs;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const requestCreateMessage = createAsyncThunk(
  'message/createMessage',
  async (messageData, { rejectWithValue, dispatch }) => {
    try {
      const { message, chatId, sentBy } = messageData;
      const res = await addMessage({ chatId, message, userId: sentBy });
      dispatch(requestLoadMessages(chatId));
      return res;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

const initialState = {
  docs: [],
  loading: true,
  error: '',
  chatId: '',
};
export const chatSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      const { payload } = action;
      state.chatId = payload.chatId;
      state.docs = [...state.docs, ...payload.docs];
      state.loading = false;
    },
    unsetMessages: (state) => {
      state.docs = [];
    },
  },
  extraReducers: {
    [requestLoadMessages.pending]: (state) => {
      state.loading = true;
    },
    [requestLoadMessages.fulfilled]: (state, action) => {
      state.docs = action.payload;
      state.loading = false;
      state.error = '';
    },
  },
});

export const { setMessages, unsetMessages } = chatSlice.actions;
export default chatSlice.reducer;
