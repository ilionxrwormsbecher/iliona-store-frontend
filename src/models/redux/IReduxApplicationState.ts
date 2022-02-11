import { CategoryState } from './../../store/slices/categories/categoryTypes';
import { PackagesState } from "../../store/slices/packages/packageTypes";

export interface IReduxApplicationState {
    router: any,
    packagesSlice: PackagesState,
    categorySlice: CategoryState
}
