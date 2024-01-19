import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface ScoreObject {
    scores: Record<string, number>;
}

const initialState:ScoreObject = {
    scores: {}
}

export const catSlice = createSlice({
    name: "cats",
    initialState,
    reducers: {
        increaseScore: (state, action: PayloadAction<number>) => {
            const catId = action.payload;
            
            if(state.scores[catId]){
                state.scores[catId]++;
            } else {
                state.scores[catId] = 1;
            }
        }
    }
})

export const { increaseScore } = catSlice.actions;
export default catSlice.reducer;