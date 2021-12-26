/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addMessage } from '../../services';

export const requestCreateMessage = createAsyncThunk(
  'message/requestCreateMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      const { message, chatId, sentBy } = messageData;
      const res = await addMessage({ chatId, message, userId: sentBy });
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

      if (state.chatId !== '' && state.chatId !== payload.chatId) {
        state.docs = [];
      }
      state.docs = [...state.docs, ...payload.docs];

      state.chatId = payload.chatId;
      state.loading = false;
    },
    unsetMessages: (state) => {
      state.docs = [];
    },
  },
});

export const { setMessages, unsetMessages } = chatSlice.actions;
export default chatSlice.reducer;
