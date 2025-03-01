import { createSlice } from "@reduxjs/toolkit"
import { useEffect } from "react";


export const resultReducer = createSlice(
    
    {
    name: 'result',
    initialState : {
        userId : null,
        result : []
    },
    reducers : {
        setUserId : (state, action) => {
            state.userId = action.payload
        },
        pushResultAction : (state, action) => {
            state.result.push(action.payload)
        },
        updateResultAction : (state, action) => {
            const { trace, checked } = action.payload;
            state.result.fill(checked, trace, trace + 1)
        },
        resultResultAction : () => {
            return {
                userId : null,
                result : []
            }
        }
    }
})

export const { setUserId, pushResultAction, resultResultAction, updateResultAction } = resultReducer.actions;

export default resultReducer.reducer;