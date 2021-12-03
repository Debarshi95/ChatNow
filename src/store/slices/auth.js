/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { addUser } from '../../services';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: '',
};

export const requestSignIn = createAsyncThunk(
  'auth/requestSignIn',
  async (userData, { rejectWithValue }) => {
    try {
      const { email, password } = userData;
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/signOut', async () => {
  await signOut(auth);
});

export const requestSignup = createAsyncThunk(
  'auth/requestSignup',
  async (userData, { rejectWithValue }) => {
    try {
      const { email, username, password } = userData;
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res?.user) {
        await addUser({ email, username });
      }
      return res;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

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
    [requestSignIn.pending]: (state) => {
      state.loading = true;
    },
    [requestSignIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    [requestSignIn.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
    },
    [requestSignup.pending]: (state) => {
      state.loading = true;
    },
    [requestSignup.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    [requestSignup.fulfilled]: (state) => {
      state.isAuthenticated = true;
      state.loading = false;
    },
  },
});

export const { setUser, unsetUser } = authSlice.actions;

export default authSlice.reducer;
