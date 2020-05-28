import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AppState } from "../../redux/configure.store";
import { loadCourses } from "../../redux/actions/course.actions";
import { loadAuthors } from "../../redux/actions/author.actions";
import { Course } from "../../models/course.interface";
import { Author } from "../../models/author.interface";
import { FormErrors } from "../../models/form-errors.interface";
import CourseForm from "./CourseForm";

interface ManageCourseStateProps {
  courses: Course[];
  authors: Author[];
  loadCourses: any;
  loadAuthors: any;
}
interface ManageCoursePageProps {
  course: Course;
}

type ManageCourseProps = ManageCourseStateProps & ManageCoursePageProps;

function ManageCoursePage({
  course: initialCourse,
  courses,
  authors,
  loadCourses,
  loadAuthors,
}: ManageCourseProps): JSX.Element {
  const [course, setCourse] = useState({ ...initialCourse });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        if (courses.length === 0) {
          loadCourses();
        }
        if (authors.length === 0) {
          loadAuthors();
        }
      } catch (error) {
        alert(`error: ${error}`);
      }
    }
    fetchData();
  }, []);

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = target;
    setCourse({
      ...course,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    });
  };

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      saving={false}
      onChange={handleChange}
      onSave={() => {}}
    />
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
    course: {
      id: 0,
      slug: "",
      title: "",
      authorName: "",
      authorId: 0,
      category: "",
    },
    courses: state.courses.courses,
    authors: state.authors.authors,
  };
};

export default connect(mapStateToProps, {
  loadCourses,
  loadAuthors,
})(ManageCoursePage);
