import { UPDATE_DIFFICULTY } from '../actions/actionTypes';

const initialState = {
    difficulty: null
};

const difficultyReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_DIFFICULTY:
            return {
                ...state,
                difficulty: action.payload
            };
        default:
            return state;
    }
};

export default difficultyReducer;
