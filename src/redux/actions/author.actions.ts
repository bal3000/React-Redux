import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import * as authorApi from "../../api/authorApi";
import { AuthorActionTypes, LOAD_AUTHOR_SUCCESS } from "../types/author.types";
import { AppState } from "../configure.store";
import { Author } from "../../models/author.interface";
import { beginApiCall } from "./apiStatus.actions";

export function loadAuthorSuccess(authors: Author[]): AuthorActionTypes {
  return { type: LOAD_AUTHOR_SUCCESS, authors };
}

export function loadAuthors(): ThunkAction<void, AppState, null, Action> {
  return async (dispatch) => {
    try {
      dispatch(beginApiCall());
      const authors = await getAuthors();
      dispatch(loadAuthorSuccess(authors));
    } catch (error) {
      throw error;
    }
  };
}

async function getAuthors() {
  return authorApi.getAuthors();
}
