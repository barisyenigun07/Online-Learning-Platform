import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice";
import { thunk } from "redux-thunk";

const persistConfig = {
    key: "rootOLP",
    storage
}

const reducer = combineReducers({
    auth: authSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducer);


const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk)
});

export const persistor = persistStore(store);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;