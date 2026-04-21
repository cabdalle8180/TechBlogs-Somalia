import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 1. Register Action
export const register = createAsyncThunk("user/register", async (userInfo, { rejectWithValue }) => {
    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(userInfo)
        });
        const data = await response.json();
        if (!response.ok) return rejectWithValue(data || { message: "Registration failed" });
        return data;
    } catch (error) {
        return rejectWithValue({ message: error.message });
    }
});

// 2. Login Action
export const login = createAsyncThunk("user/login", async (userInfo, { rejectWithValue }) => {
    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(userInfo)
        });
        const data = await response.json();
        if (!response.ok) return rejectWithValue(data || { message: "Login failed" });
        return data;
    } catch (error) {
        return rejectWithValue({ message: error.message });
    }
});

// 3. Logout Action
export const logout = createAsyncThunk("user/logout", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) return rejectWithValue(data || { message: "Logout failed" });
        return data;
    } catch (error) {
        return rejectWithValue({ message: error.message });
    }
});

// Initial State Helper
const getInitialUser = () => {
    if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("currentUser");
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (e) {
            return null;
        }
    }
    return null;
};

const initialState = {
    currentUser: getInitialUser(),
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

export const userslice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // MUHIIM: Kan ayaa xallinaya in toast-ku uusan soo laablaaban
        resetStatus: (state) => {
            state.status = "idle";
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentUser = action.payload;
                state.error = null;
                localStorage.setItem("currentUser", JSON.stringify(action.payload));
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.message || "Login failed";
            })

            // Register
            .addCase(register.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentUser = action.payload;
                state.error = null;
                localStorage.setItem("currentUser", JSON.stringify(action.payload));
            })
            .addCase(register.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.message || "Registration failed";
            })

            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.status = "idle"; // Dib ugu celi idle
                state.currentUser = null;
                state.error = null;
                localStorage.removeItem("currentUser");
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.message || "Logout failed";
            });
    }
});

// Soo saar (export) resetStatus si aad ugu isticmaasho Signin.jsx
export const { resetStatus } = userslice.actions;
export default userslice.reducer;