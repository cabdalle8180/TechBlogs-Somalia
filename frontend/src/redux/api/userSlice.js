import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";

// login
export const login = createAsyncThunk("user/login", async (userInfo)=> {
    const response = await fetch("/api/auth/login",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
    })
    return response.json();
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
        builder.addCase(login.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.currentUser = action.payload;
            state.error = null;
            localStorage.setItem("currentUser", JSON.stringify(action.payload));
        })
        builder.addCase(login.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })



    }

})

export default userslice.reducer;

