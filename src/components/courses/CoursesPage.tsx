import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AppState } from "../../redux/configure.store";
import { createCourse, loadCourses } from "../../redux/actions/course.actions";
import { Course } from "../../models/course.interface";

interface CoursesStateProps {
  courses: Course[];
  createCourse: typeof createCourse;
  loadCourses: any;
}
interface CoursePageProps {}

type CourseProps = CoursesStateProps & CoursePageProps;

function CoursesPage({
  courses,
  createCourse,
  loadCourses,
}: CourseProps): JSX.Element {
  useEffect(() => {
    async function fetchData() {
      try {
        loadCourses();
      } catch (error) {
        alert(`error: ${error}`);
      }
    }
    fetchData();
  }, [loadCourses]);

  return (
    <React.Fragment>
      <h2>Courses</h2>
      {courses.map((c) => (
        <div key={c.title}>{c.title}</div>
      ))}
    </React.Fragment>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    courses: state.courses.courses,
  };
};

export default connect(mapStateToProps, { createCourse, loadCourses })(
  CoursesPage
);
