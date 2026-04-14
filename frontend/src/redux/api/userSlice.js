import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    status: "idle",
    error: null
}
export const userslice = createSlice({
    name: "user",
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {

    }

})

export default userslice.reducer;