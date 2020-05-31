import * as types from "../types/shared.types";

export function beginApiCall(): types.SharedActionTypes {
  return { type: types.BEGIN_API_CALL };
}
