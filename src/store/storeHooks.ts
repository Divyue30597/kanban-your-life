import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
/**
 * useAppSelector is a typed version of useSelector.
 * It will automatically infer the type of the state slice you are trying to access.
 * @see https://react-redux.js.org/api/hooks#useselector
 */
