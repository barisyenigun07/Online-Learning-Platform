import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";
import { User } from "../models/User";

const token = localStorage.getItem("token");

type AuthResponse = {
    token: string,
    user: User
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token,
        isLoggedIn: false,
        authUser: {id: 0, name: "", email: "", role: ""}
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            state.isLoggedIn = false;
            state.authUser = {id: 0, name: "", email: "", role: ""};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
            state.authUser = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        })
        builder.addCase(userLogin.rejected, (state) => {
            state.authUser = {id: 0, name: "", email: "", role: ""};
            state.isLoggedIn = false;
        })
    }
});

export const authActions = authSlice.actions;
export default authSlice;