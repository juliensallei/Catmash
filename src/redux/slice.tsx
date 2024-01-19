import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ScoreObject {
    scores: Record<string, number>;
}

/**
 * Cet état contiendra tous les identifiants de l'api, une fois que les données auront été récupérées.
 * Par exemple : { idName : 0 }
 */
const initialState:ScoreObject = {
    scores: {}
}

/**
 * Lors de la récupération initiale des données de l'application, nous abonnerons chaque identifiant à l'état de cette "slice".
 * Ensuite, l'utilisateur cliquera sur un choix, et augmentera un score basé sur l'identifiant du chat choisi.
 */
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