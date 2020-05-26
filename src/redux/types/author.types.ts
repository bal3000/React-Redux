import { Author } from "../../models/author.interface";

export interface AuthorState {
  authors: Author[];
}
export const LOAD_AUTHOR_SUCCESS = "LOAD_AUTHOR_SUCCESS";

interface LoadAuthorsSuccessAction {
  type: typeof LOAD_AUTHOR_SUCCESS;
  authors: Author[];
}

export type AuthorActionTypes = LoadAuthorsSuccessAction;
