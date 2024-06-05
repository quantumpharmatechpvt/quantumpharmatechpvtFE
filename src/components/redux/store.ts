"use client";
import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import UsersReducer from "@/components/slices/usersSlice";
import cartProductsReducer from "@/components/slices/productsSlice";

export const store = configureStore({
  reducer: {
    userSlice: UsersReducer,
    cartSlice: cartProductsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppStore = (): [
  TypedUseSelectorHook<RootState>,
  AppDispatch
] => [useAppSelector, useAppDispatch()];
