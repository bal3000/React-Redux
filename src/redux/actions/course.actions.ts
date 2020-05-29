import * as courseApi from "../../api/courseApi";
import { Course } from "../../models/course.interface";
import {
  CourseActionTypes,
  LOAD_COURSES_SUCCESS,
  CREATE_COURSES_SUCCESS,
  UPDATE_COURSES_SUCCESS,
} from "../types/course.types";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../configure.store";
import { Action } from "redux";

export function loadCoursesSuccess(courses: Course[]): CourseActionTypes {
  return { type: LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course: Course): CourseActionTypes {
  return { type: CREATE_COURSES_SUCCESS, course };
}

export function updateCourseSuccess(course: Course): CourseActionTypes {
  return { type: UPDATE_COURSES_SUCCESS, course };
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

export function saveCourse(
  course: Course
): ThunkAction<void, AppState, null, Action> {
  return async (dispatch) => {
    try {
      const savedCourse = await courseApi.saveCourse(course);
      course.id
        ? dispatch(updateCourseSuccess(savedCourse))
        : dispatch(createCourseSuccess(savedCourse));
    } catch (error) {
      throw error;
    }
  };
}

async function getCourses() {
  return courseApi.getCourses();
}
