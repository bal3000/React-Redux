import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { AppState } from "../../redux/configure.store";
import * as courseActions from "../../redux/actions/course.actions";
import { Course } from "../../models/course.interface";
import { CourseActionTypes } from "../../redux/types/course.types";
import { Dispatch } from "redux";

interface CoursesStateProps {
  courses: Course[];
}

interface CourseProps extends CoursesStateProps {
  dispatch: Dispatch<CourseActionTypes>;
}

function CoursesPage(props: CourseProps): JSX.Element {
  // TODO: Add <Course>
  const [course, setCourse] = useState<Course>({
    id: 0,
    slug: "",
    title: "",
    authorId: 0,
    category: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCourse({ ...course, title: event.target.value });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.dispatch(courseActions.createCourse(course));
    alert(course.title);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Courses</h2>
      <h3>Add Course</h3>
      <input type="text" onChange={handleChange} value={course.title} />
      <input type="submit" value="Save" />
    </form>
  );
}

CoursesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state: AppState): CoursesStateProps => {
  return {
    courses: state.courses.courses,
  };
};

export default connect(mapStateToProps)(CoursesPage);
