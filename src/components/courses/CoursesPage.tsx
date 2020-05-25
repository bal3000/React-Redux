import React, { useState } from "react";
import { connect } from "react-redux";
import { AppState } from "../../redux/configure.store";
import { createCourse } from "../../redux/actions/course.actions";
import { Course } from "../../models/course.interface";

interface CoursesStateProps {
  courses: Course[];
  createCourse: typeof createCourse;
}
interface CoursePageProps {}

type CourseProps = CoursesStateProps & CoursePageProps;

function CoursesPage(props: CourseProps): JSX.Element {
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
    props.createCourse(course);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Courses</h2>
      <h3>Add Course</h3>
      <input type="text" onChange={handleChange} value={course.title} />
      <input type="submit" value="Save" />

      {props.courses.map((c) => (
        <div key={c.title}>{c.title}</div>
      ))}
    </form>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    courses: state.courses.courses,
  };
};

export default connect(mapStateToProps, { createCourse })(CoursesPage);
