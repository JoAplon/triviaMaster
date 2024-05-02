import { UPDATE_DIFFICULTY } from './actionTypes';

export const updateDifficulty = (newDifficulty) => {
    return {
        type: UPDATE_DIFFICULTY,
        payload: newDifficulty
    };
};

import { UPDATE_CATEGORY } from './actionTypes';

export const updateCategory = (newCategory) => {
    return {
        type: UPDATE_CATEGORY,
        payload: newCategory
    };
};
