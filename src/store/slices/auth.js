/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, firestore } from '../../utils/firebase';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: '',
};

export const signIn = createAsyncThunk('auth/signIn', async (userData, { rejectWithValue }) => {
  try {
    const { email, password } = userData;
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  } catch (error) {
    return rejectWithValue(error?.message);
  }
});

export const logOut = createAsyncThunk('auth/signOut', async () => {
  await signOut(auth);
});

export const signUp = createAsyncThunk('auth/signUp', async (userData, { rejectWithValue }) => {
  try {
    const { email, username, password } = userData;
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (res?.user) {
      const ref = collection(firestore, 'users');
      const response = await addDoc(ref, { email, username, createdAt: serverTimestamp() });
      return response;
    }
    return res;
  } catch (error) {
    return rejectWithValue(error?.message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.isAuthenticated = true;
    },
    unsetUser: (state) => {
      state.user = null;
      state.loading = false;
      state.isAuthenticated = false;
    },
  },
  extraReducers: {
    [signIn.pending]: (state) => {
      state.loading = true;
    },
    [signIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    [signIn.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
    },
    [signUp.pending]: (state) => {
      state.loading = true;
    },
    [signUp.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    [signUp.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
    },
  },
});

export const { setUser, unsetUser } = authSlice.actions;

export default authSlice.reducer;
