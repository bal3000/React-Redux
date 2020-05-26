import {
  AuthorState,
  AuthorActionTypes,
  LOAD_AUTHOR_SUCCESS,
} from "../types/author.types";

const initialState: AuthorState = {
  authors: [],
};

export default function authorReducer(
  state = initialState,
  action: AuthorActionTypes
): AuthorState {
  switch (action.type) {
    case LOAD_AUTHOR_SUCCESS:
      return { ...state, authors: action.authors };
    default:
      return state;
  }
}
