/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, getDoc, query, serverTimestamp, where } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';

export const loadMessages = createAsyncThunk(
  'message/loadMessage',
  async (chatId, { rejectWithValue }) => {
    try {
      const docRef = query(collection(firestore, 'messages'), where('chatId', '==', chatId));
      const res = await getDoc(docRef);
      return res;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const createMessage = createAsyncThunk(
  'message/createMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      const { message, chatId, sentBy } = messageData;
      const dbQuery = collection(firestore, 'messages');
      const res = await addDoc(dbQuery, {
        message,
        chatId,
        sentBy,
        createdAt: serverTimestamp(),
      });
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
    [loadMessages.pending]: (state) => {
      state.loading = true;
    },
    [loadMessages.fulfilled]: (state, action) => {
      state.docs = action.payload;
      state.loading = false;
      state.error = '';
    },
  },
});

export const { setMessages, unsetMessages } = chatSlice.actions;
export default chatSlice.reducer;
