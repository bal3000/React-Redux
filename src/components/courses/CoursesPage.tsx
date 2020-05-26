import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AppState } from "../../redux/configure.store";
import { loadCourses } from "../../redux/actions/course.actions";
import { loadAuthors } from "../../redux/actions/author.actions";
import { Course } from "../../models/course.interface";
import CourseList from "./CourseList";
import { Author } from "../../models/author.interface";

interface CoursesStateProps {
  courses: Course[];
  authors: Author[];
  loadCourses: any;
  loadAuthors: any;
}
interface CoursePageProps {}

type CourseProps = CoursesStateProps & CoursePageProps;

function CoursesPage({ courses, loadCourses }: CourseProps): JSX.Element {
  useEffect(() => {
    async function fetchData() {
      try {
        loadCourses();
        loadAuthors();
      } catch (error) {
        alert(`error: ${error}`);
      }
    }
    fetchData();
  }, [loadCourses]);

  return (
    <React.Fragment>
      <h2>Courses</h2>
      <CourseList courses={courses} />
    </React.Fragment>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    courses: state.courses.courses?.map((course) => {
      return {
        ...course,
        authorName: state.authors.authors.find((a) => a.id === course.authorId)
          ?.name,
      };
    }),
    authors: state.authors.authors,
  };
};

export default connect(mapStateToProps, {
  loadCourses,
  loadAuthors,
})(CoursesPage);
