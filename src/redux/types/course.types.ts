import { Course } from "../../models/course.interface";

export interface CourseState {
  courses: Course[];
}

export const CREATE_COURSE = "CREATE_COURSE";

interface CreateCourseAction {
  type: typeof CREATE_COURSE;
  course: Course;
}

export type CourseActionTypes = CreateCourseAction;
