import {applyMiddleware, createStore} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {userReducer} from "./reducers/userReducer";

export const store = configureStore({
  reducer: userReducer,
});

export type storeState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch // you can use this Dispatch type in your thunks
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

export const useTypedSelector: TypedUseSelectorHook<storeState> = useSelector;