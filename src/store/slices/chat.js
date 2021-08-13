/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';

const initialState = {
  docs: [],
  loading: true,
  error: '',
};

export const createChat = createAsyncThunk(
  'chat/createChat',
  async (chatData, { rejectWithValue }) => {
    try {
      const { userEmail, chatUserEmail, userId } = chatData;
      const dbRef = collection(firestore, 'chats');

      const res = await addDoc(dbRef, {
        users: [userEmail, chatUserEmail],
        createdAt: serverTimestamp(),
        createdBy: userId,
      });

      return res;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);
export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.docs = [...state.docs, ...action.payload];
      state.loading = false;
    },
  },
  extraReducers: {},
});

export const { setChat } = chatSlice.actions;
export default chatSlice.reducer;
