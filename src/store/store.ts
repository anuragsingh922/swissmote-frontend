
import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './eventSlice';
import userReducer from "./userSlice.js"

export const store = configureStore({
  reducer: {
    events: eventReducer,
    user : userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
