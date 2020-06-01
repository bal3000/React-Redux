export const BEGIN_API_CALL = "BEGIN_API_CALL";
export const API_CALL_ERROR = "API_CALL_ERROR";

export interface SharedState {
  apiCallsInProgress: number;
}

interface BeginCallAction {
  type: typeof BEGIN_API_CALL;
}
interface ApiErrorAction {
  type: typeof API_CALL_ERROR;
  error: any;
}

export type SharedActionTypes = BeginCallAction | ApiErrorAction;
