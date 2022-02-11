import { CategoryState, IlionaCategoryTypes } from './categoryTypes';
import { IIlionaCategory } from '../../../models/Ilionacategory';

const initialState: CategoryState = {
    errorMessage: "",
    categories: []  as IIlionaCategory[],
    isFetching: false,
};

export function CategoriesReducer(
    state = initialState,
    action: { type: IlionaCategoryTypes; payload: any }
): CategoryState {
    switch (action.type) {
    case IlionaCategoryTypes.FETCH_ILIONA_CATEGORIES_STARTED:
        return {
            ...state,
            isFetching: true
        };

    case IlionaCategoryTypes.FETCH_ILIONA_CATEGORIES_FAILURE:
        return {
            ...state,
            errorMessage: action?.payload?.errorMessage,
            isFetching: false
        };

    case IlionaCategoryTypes.FETCH_ILIONA_CATEGORIES_SUCCESS:
        return {
            ...state,
            categories: action.payload.categories,
            errorMessage: '',
            isFetching: false
        };

    default: {
        return state;
    }

    }
}
