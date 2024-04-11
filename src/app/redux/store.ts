import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import appraisal from '../redux/features/appraisalSlice';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

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
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

// Define types for the RootState and AppDispatch using the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the configured Redux store as the default export
export default store;