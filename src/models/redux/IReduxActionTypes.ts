import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { IReduxApplicationState } from "./IReduxApplicationState";

export type AppThunk = ActionCreator<ThunkAction<void, IReduxApplicationState, null, Action<string>>>;

export type RequestStartedDispatchType = {
    type: string
}

export type RequestSuccessDispatchType = {
    type: string,
    payload: any
}

export type RequestFailedDispatchType = {
    type: string,
    errorMessage: string
}

