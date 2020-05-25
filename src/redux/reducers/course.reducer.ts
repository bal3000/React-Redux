import {
  CourseState,
  CourseActionTypes,
  CREATE_COURSE,
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
    default:
      return state;
  }
}
