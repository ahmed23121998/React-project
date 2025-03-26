import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"


export const moviesAction = createAsyncThunk("movies/getAll", async () => {
    const res = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=b35cf3dbcd08fd7825107a79aa6eb1cb")
    return res.json()
})
export const moviesSlice = createSlice({
    name:"movies",
    initialState:{movies:[]},
    extraReducers:(builder) => {
        builder.addCase(moviesAction.fulfilled, (state, action) => {
            state.movies = action.payload
        })

    }
})
export default moviesSlice.reducer