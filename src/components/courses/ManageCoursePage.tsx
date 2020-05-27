import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AppState } from "../../redux/configure.store";
import { loadCourses } from "../../redux/actions/course.actions";
import { loadAuthors } from "../../redux/actions/author.actions";
import { Course } from "../../models/course.interface";
import { Author } from "../../models/author.interface";

interface ManageCourseStateProps {
  courses: Course[];
  authors: Author[];
  loadCourses: any;
  loadAuthors: any;
}
interface ManageCoursePageProps {}

type ManageCourseProps = ManageCourseStateProps & ManageCoursePageProps;

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
}: ManageCourseProps): JSX.Element {
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
      <h2>Manage Course</h2>
    </React.Fragment>
  );
}

ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
};

const mapStateToProps = (state: AppState) => {
  return {
    courses: state.courses.courses,
    authors: state.authors.authors,
  };
};

export default connect(mapStateToProps, {
  loadCourses,
  loadAuthors,
})(ManageCoursePage);
