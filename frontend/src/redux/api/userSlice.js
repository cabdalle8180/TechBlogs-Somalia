import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// register
export const register = createAsyncThunk("user/register", async (userInfo, {rejectWithValue}) => {
    const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
    })
    // return response.json();
    const data = await response.json();
    if(!response.ok || data.error) {
        return rejectWithValue(data || {error: "Registration failed"});
    }
    return data;
})



// login
export const login = createAsyncThunk("user/login", async (userInfo,{rejectWithValue})=> {
    const response = await fetch("/api/auth/login",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
    })
    const data = await response.json();
    if(!response.ok || data.error) {
        return rejectWithValue(data || {error: "Login failed"});
    }
    return data;
})

const getinitialUser = () =>{
    if(typeof window !== "undefined") {
        const storedUser = localStorage.getItem("currentUser");
        return {
            currentUser: storedUser ? JSON.parse(storedUser) : null,
            status: "idle",
            error: null
        }
    }
    return {
    currentUser: null,
    status: "idle",
    error: null
        }

}

export const userslice = createSlice({
    name: "user",
    initialState: getinitialUser(),
    reducers:{

    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.currentUser = action.payload;
            state.error = null;
            toast.success("Login successful 🎉");
            localStorage.setItem("currentUser", JSON.stringify(action.payload));
        })
        .addCase(login.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
            toast.error(`Login failed: ${action.error.message}`);
        })
// register cases
.addCase(register.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.currentUser = action.payload;
            state.error = null;
            toast.success("Registration successful 🎉");
            localStorage.setItem("currentUser", JSON.stringify(action.payload));
        })
        .addCase(register.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
            toast.error(`Registration failed: ${action.error.message}`);
        })

      


    }

})

export default userslice.reducer;

