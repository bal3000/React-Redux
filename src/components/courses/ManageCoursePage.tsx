import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { History, LocationState } from "history";
import { AppState } from "../../redux/configure.store";
import { toast } from "react-toastify";
import { loadCourses, saveCourse } from "../../redux/actions/course.actions";
import { loadAuthors } from "../../redux/actions/author.actions";
import { Course } from "../../models/course.interface";
import { Author } from "../../models/author.interface";
import { FormErrors } from "../../models/form-errors.interface";
import CourseForm from "./CourseForm";
import { match } from "react-router-dom";
import Spinner from "../common/Spinner";

interface ManageCourseStateProps {
  courses: Course[];
  authors: Author[];
  loadCourses: any;
  loadAuthors: any;
  saveCourse: any;
}
interface ManageCoursePageProps {
  match: match<{ slug: string }>;
  course: Course;
  history: History<LocationState>;
}

type ManageCourseProps = ManageCourseStateProps & ManageCoursePageProps;

function ManageCoursePage({
  course: initialCourse,
  ...props
}: ManageCourseProps): JSX.Element {
  const [course, setCourse] = useState({ ...initialCourse });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        if (props.courses.length === 0) {
          props.loadCourses();
        } else {
          setCourse({ ...initialCourse });
        }
        if (props.authors.length === 0) {
          props.loadAuthors();
        }
      } catch (error) {
        alert(`error: ${error}`);
      }
    }
    fetchData();
  }, [initialCourse]);

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = target;
    setCourse({
      ...course,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    });
  };

  const handleSave = (event: React.FormEvent<Element>) => {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    props
      .saveCourse(course)
      .then(() => {
        toast.success("Course Saved");
        props.history.push("/courses");
      })
      .catch((error: any) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  };

  const formIsValid = (): boolean => {
    const { title, authorId, category } = course;
    const _errors: FormErrors = {};
    if (!title) _errors.title = "Title is required";
    if (authorId === 0) _errors.authorId = "Author ID is required";
    if (!category) _errors.category = "Category is required";

    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  };

  return props.authors.length === 0 || props.courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={props.authors}
      saving={saving}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
};

export function getCourseBySlug(
  courses: Course[],
  slug: string
): Course | null {
  return courses.find((course) => course.slug === slug) || null;
}

const mapStateToProps = (state: AppState, ownProps: ManageCoursePageProps) => {
  const slug = ownProps.match.params.slug;
  const selected = getCourseBySlug(state.courses.courses, slug);
  const newCourse = {
    id: 0,
    slug: "",
    title: "",
    authorName: "",
    authorId: 0,
    category: "",
  };
  const course =
    state.courses.courses.length > 0 && selected ? selected : newCourse;
  return {
    course,
    courses: state.courses.courses,
    authors: state.authors.authors,
  };
};

export default connect(mapStateToProps, {
  loadCourses,
  loadAuthors,
  saveCourse,
})(ManageCoursePage);
