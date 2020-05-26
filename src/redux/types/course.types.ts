import { Course } from "../../models/course.interface";

export interface CourseState {
  courses: Course[];
}

export const CREATE_COURSE = "CREATE_COURSE";
export const LOAD_COURSES_SUCCESS = "LOAD_COURSES_SUCCESS";

interface CreateCourseAction {
  type: typeof CREATE_COURSE;
  course: Course;
}

interface LoadCoursesSuccessAction {
  type: typeof LOAD_COURSES_SUCCESS;
  courses: Course[];
}

export type CourseActionTypes = CreateCourseAction | LoadCoursesSuccessAction;
