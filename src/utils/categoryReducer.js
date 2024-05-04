import { UPDATE_CATEGORY } from '../actions/actionTypes';

const initialState = {
    category: null
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CATEGORY:
            return {
                ...state,
                category: action.payload
            };
        default:
            return state;
    }
};

export default categoryReducer;
