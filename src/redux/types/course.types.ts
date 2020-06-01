import { Course } from "../../models/course.interface";

export interface CourseState {
  courses: Course[];
}

export const CREATE_COURSE = "CREATE_COURSE";
export const LOAD_COURSES_SUCCESS = "LOAD_COURSES_SUCCESS";
export const CREATE_COURSES_SUCCESS = "CREATE_COURSES_SUCCESS";
export const UPDATE_COURSES_SUCCESS = "UPDATE_COURSES_SUCCESS";
export const DELETE_COURSE_OPTIMISTIC = "DELETE_COURSE_OPTIMISTIC";

interface CreateCourseAction {
  type: typeof CREATE_COURSE;
  course: Course;
}

interface LoadCoursesSuccessAction {
  type: typeof LOAD_COURSES_SUCCESS;
  courses: Course[];
}

interface CreateCoursesSuccessAction {
  type: typeof CREATE_COURSES_SUCCESS;
  course: Course;
}

interface UpdateCoursesSuccessAction {
  type: typeof UPDATE_COURSES_SUCCESS;
  course: Course;
}

interface DeleteCoursesOptimisticAction {
  type: typeof DELETE_COURSE_OPTIMISTIC;
  course: Course;
}

export type CourseActionTypes =
  | CreateCourseAction
  | LoadCoursesSuccessAction
  | CreateCoursesSuccessAction
  | UpdateCoursesSuccessAction
  | DeleteCoursesOptimisticAction;
