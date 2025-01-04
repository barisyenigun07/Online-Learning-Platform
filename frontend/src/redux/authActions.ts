import { createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
    'auth/login',
    async (data: {email: string, password: string}, thunkAPI) => {
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                // Handle HTTP errors explicitly
                const error = await response.json();
                return thunkAPI.rejectWithValue(error.message || "Login failed");
            }

            const respBody = await response.json();
            localStorage.setItem("token", respBody.token);
            return respBody;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)