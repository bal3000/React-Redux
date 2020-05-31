import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
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

function CoursesPage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
}: CourseProps): JSX.Element {
  const [redirectObj, setRedirectObj] = useState({
    redirectToAddCoursePage: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        if (courses.length === 0 && authors.length === 0) {
          loadCourses();
          loadAuthors();
        }
      } catch (error) {
        alert(`error: ${error}`);
      }
    }
    fetchData();
  }, [authors.length, courses.length, loadAuthors, loadCourses]);

  return (
    <React.Fragment>
      <h2>Courses</h2>
      {redirectObj.redirectToAddCoursePage && <Redirect to="/course" />}
      <button
        style={{ marginBottom: 20 }}
        className="btn btn-primary add-course"
        onClick={() => setRedirectObj({ redirectToAddCoursePage: true })}
      >
        Add Course
      </button>
      <CourseList courses={courses} />
    </React.Fragment>
  );
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
};

const mapStateToProps = (state: AppState) => {
  return {
    courses:
      state.courses?.courses.length === 0
        ? []
        : state.courses?.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.authors.find(
                (a) => a.id === course.authorId
              )?.name,
            };
          }),
    authors: state.authors.authors,
  };
};

export default connect(mapStateToProps, {
  loadCourses,
  loadAuthors,
})(CoursesPage);
