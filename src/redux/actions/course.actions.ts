import * as courseApi from "../../api/courseApi";
import { Course } from "../../models/course.interface";
import {
  CREATE_COURSE,
  CourseActionTypes,
  LOAD_COURSES_SUCCESS,
} from "../types/course.types";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../configure.store";
import { Action } from "redux";

export function createCourse(course: Course): CourseActionTypes {
  return { type: CREATE_COURSE, course };
}

export function loadCoursesSuccess(courses: Course[]): CourseActionTypes {
  return { type: LOAD_COURSES_SUCCESS, courses };
}

export function loadCourses(): ThunkAction<void, AppState, null, Action> {
  return async (dispatch) => {
    try {
      const courses = await getCourses();
      dispatch(loadCoursesSuccess(courses));
    } catch (error) {
      throw error;
    }
  };
}

async function getCourses() {
  return courseApi.getCourses();
}
