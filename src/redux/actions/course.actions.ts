import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import * as courseApi from "../../api/courseApi";
import { Course } from "../../models/course.interface";
import {
  CourseActionTypes,
  LOAD_COURSES_SUCCESS,
  CREATE_COURSES_SUCCESS,
  UPDATE_COURSES_SUCCESS,
  DELETE_COURSE_OPTIMISTIC,
} from "../types/course.types";
import { AppState } from "../configure.store";
import { beginApiCall, apiCallError } from "./apiStatus.actions";

export function loadCoursesSuccess(courses: Course[]): CourseActionTypes {
  return { type: LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course: Course): CourseActionTypes {
  return { type: CREATE_COURSES_SUCCESS, course };
}

export function updateCourseSuccess(course: Course): CourseActionTypes {
  return { type: UPDATE_COURSES_SUCCESS, course };
}

export function deleteCourseOptimistic(course: Course): CourseActionTypes {
  return { type: DELETE_COURSE_OPTIMISTIC, course };
}

export function loadCourses(): ThunkAction<void, AppState, null, Action> {
  return async (dispatch) => {
    try {
      dispatch(beginApiCall());
      const courses = await getCourses();
      dispatch(loadCoursesSuccess(courses));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}

export function saveCourse(
  course: Course
): ThunkAction<void, AppState, null, Action> {
  return async (dispatch) => {
    try {
      dispatch(beginApiCall());
      const savedCourse = await courseApi.saveCourse(course);
      course.id
        ? dispatch(updateCourseSuccess(savedCourse))
        : dispatch(createCourseSuccess(savedCourse));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}

export function deleteCourse(
  course: Course
): ThunkAction<void, AppState, null, Action> {
  return async (dispatch) => {
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
}

async function getCourses() {
  return courseApi.getCourses();
}
