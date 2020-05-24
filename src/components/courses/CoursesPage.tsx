import React, { useState } from "react";

function CoursesPage(): JSX.Element {
  // TODO: Add <Course>
  const [course, setCourse] = useState({ title: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCourse({ ...course, title: event.target.value });

  return (
    <form>
      <h2>Courses</h2>
      <h3>Add Course</h3>
      <input type="text" onChange={handleChange} value={course.title} />
      <input type="submit" value="Save" />
    </form>
  );
}

export default CoursesPage;
