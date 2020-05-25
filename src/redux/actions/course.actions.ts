import { Course } from "../../models/course.interface";
import { CREATE_COURSE, CourseActionTypes } from "../types/course.types";

export function createCourse(course: Course): CourseActionTypes {
  return { type: CREATE_COURSE, course };
}
