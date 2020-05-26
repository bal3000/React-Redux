import {
  CourseState,
  CourseActionTypes,
  CREATE_COURSE,
  LOAD_COURSES_SUCCESS,
} from "../types/course.types";

const initialState: CourseState = {
  courses: [],
};

export default function courseReducer(
  state = initialState,
  action: CourseActionTypes
): CourseState {
  switch (action.type) {
    case CREATE_COURSE:
      return { courses: [...state.courses, { ...action.course }] };
    case LOAD_COURSES_SUCCESS:
      return { ...state, courses: action.courses };
    default:
      return state;
  }
}
