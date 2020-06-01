import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { AppState } from "../../redux/configure.store";
import { loadCourses, deleteCourse } from "../../redux/actions/course.actions";
import { loadAuthors } from "../../redux/actions/author.actions";
import { Course } from "../../models/course.interface";
import CourseList from "./CourseList";
import Spinner from "../common/Spinner";
import { Author } from "../../models/author.interface";
import { toast } from "react-toastify";

interface CoursesStateProps {
  courses: Course[];
  authors: Author[];
  loadCourses: any;
  loadAuthors: any;
  deleteCourse: any;
  loading: boolean;
}
interface CoursePageProps {}

type CourseProps = CoursesStateProps & CoursePageProps;

function CoursesPage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  deleteCourse,
  loading,
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
  }, []);

  const handleDelete = (course: Course) => {
    toast.success("Course Deleted");
    deleteCourse(course);
  };

  return (
    <React.Fragment>
      {redirectObj.redirectToAddCoursePage && <Redirect to="/course" />}
      <h2>Courses</h2>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <button
            style={{ marginBottom: 20 }}
            className="btn btn-primary add-course"
            onClick={() => setRedirectObj({ redirectToAddCoursePage: true })}
          >
            Add Course
          </button>
          <CourseList courses={courses} onDelete={handleDelete} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
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
    loading: state.apiCallStatus > 0,
  };
};

export default connect(mapStateToProps, {
  loadCourses,
  loadAuthors,
  deleteCourse,
})(CoursesPage);
