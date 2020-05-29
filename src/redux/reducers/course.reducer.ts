import {
  CourseState,
  CourseActionTypes,
  LOAD_COURSES_SUCCESS,
  CREATE_COURSES_SUCCESS,
  UPDATE_COURSES_SUCCESS,
} from "../types/course.types";

const initialState: CourseState = {
  courses: [],
};

export default function courseReducer(
  state = initialState,
  action: CourseActionTypes
): CourseState {
  switch (action.type) {
    case CREATE_COURSES_SUCCESS:
      return { courses: [...state.courses, { ...action.course }] };
    case LOAD_COURSES_SUCCESS:
      return { ...state, courses: action.courses };
    case UPDATE_COURSES_SUCCESS:
      return {
        courses: state.courses.map((course) =>
          course.id === action.course.id ? action.course : course
        ),
      };
    default:
      return state;
  }
}
