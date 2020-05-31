export const BEGIN_API_CALL = "BEGIN_API_CALL";

export interface SharedState {
  apiCallsInProgress: number;
}

interface BeginCallAction {
  type: typeof BEGIN_API_CALL;
}

export type SharedActionTypes = BeginCallAction;
