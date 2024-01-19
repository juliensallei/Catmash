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
        increaseScore: (state, action: PayloadAction<string>) => {
            const catId = action.payload;
            
            if(state.scores[catId]){
                state.scores[catId]++;
            } else {
                state.scores[catId] = 1;
            }
        },
        subscribeIdToState: (state, action: PayloadAction<string>) => {
            const catId = action.payload;
            state.scores[catId] = 0;
        }
    }
})

export const { increaseScore, subscribeIdToState } = catSlice.actions;
export default catSlice.reducer;