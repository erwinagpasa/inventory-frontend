// Import necessary dependencies and functions
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';  // Middleware for handling asynchronous actions
import storage from 'redux-persist/lib/storage';  // Storage engine for Redux Persist
import { persistReducer } from 'redux-persist';
import appraisal from '../redux/features/appraisalSlice';

// Combine reducers (you might have more reducers in the future)
const reducers = combineReducers({
  appraisal: appraisal,
});

// Configuration for Redux Persist
const persistConfig = {
  key: 'appraisal',  // Key for the persisted data in storage
  storage,  // Use the imported storage engine
};

// Create a persisted reducer by wrapping the combined reducers with persistConfig
const reducer = persistReducer(persistConfig, reducers);

// Create the Redux store with the configured settings
const store = configureStore({
  reducer: reducer,  // Use the persisted reducer
  devTools: process.env.NODE_ENV !== 'production',  // Enable Redux DevTools in development
  middleware: [thunk],  // Apply Redux Thunk middleware for handling async actions
});

// Define types for the RootState and AppDispatch using the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the configured Redux store as the default export
export default store;