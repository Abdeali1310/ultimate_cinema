import { createSlice } from '@reduxjs/toolkit'

const initialState= {
    info: null,
  }
export const peopleSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    loadperson:(state,action)=>{
        state.info = action.payload
    },
    removeperson:(state)=>{
        state.info = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { loadperson,removeperson } = peopleSlice.actions

export default peopleSlice.reducer