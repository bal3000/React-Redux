import {
  SharedState,
  SharedActionTypes,
  BEGIN_API_CALL,
  API_CALL_ERROR,
} from "../types/shared.types";

const initialState: SharedState = {
  apiCallsInProgress: 0,
};

const actionTypeEndsInSuccess = (type: string): boolean => {
  return type.substring(type.length - 8) === "_SUCCESS";
};

export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action: SharedActionTypes | any
): number {
  if (action.type === BEGIN_API_CALL) {
    return state + 1;
  } else if (
    action.type === API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return state - 1;
  }

  return state;
}
