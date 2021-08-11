import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import chatReducer from './slices/chat';
import messageReducer from './slices/message';

export default () =>
  configureStore({
    reducer: {
      auth: authReducer,
      chats: chatReducer,
      messages: messageReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
