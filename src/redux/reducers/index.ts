import { combineReducers } from "redux";
import courses from "./course.reducer";
import authors from "./author.reducer";
import apiCallStatus from "./apiStatus.reducer";

const rootReducer = combineReducers({
  courses,
  authors,
  apiCallStatus,
});

export default rootReducer;
