import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    user: null,
    status: 'idle'
}

const manageLoggedInSlice = createSlice({
    name: "manageLoggedIn",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.isLoggedIn = true,
            state.user = action.payload.user,
            state.status = action.payload.status || 'active'
        },
        logoutUser: (state) => {
            state.isLoggedIn = false,
            state.user = null,
            state.status = 'idle'
        }
    }
})

export const {loginUser, logoutUser} = manageLoggedInSlice.actions;
export default manageLoggedInSlice.reducer;