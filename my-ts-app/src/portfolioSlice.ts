import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

interface Project {  id: number;  name: string;  description: string;  images: string;}

interface PortfolioState {  projects: Project[];  status: 'idle' | 'loading' | 'succeeded' | 'failed';  error: string | null;}

const initialState: PortfolioState = {  projects: [],  status: 'idle',  error: null,};

export const fetchProjects = createAsyncThunk('portfolio/fetchProjects', async () => {

const response = await axios.get('https://deploy-zotnoah.onrender.com');

return response.data;

});


const portfolioSlice = createSlice({

name: 'portfolio',  initialState,

reducers: {},

extraReducers: (builder) => {

builder

.addCase(fetchProjects.pending, (state) => {

state.status = 'loading';

})

.addCase(fetchProjects.fulfilled, (state, action) => {

state.status = 'succeeded';

state.projects = action.payload;

})

.addCase(fetchProjects.rejected, (state, action) => {

state.status = 'failed';

state.error = action.error.message ?? null;

});

},

});

export default portfolioSlice.reducer;