import React from "react";
import { Link } from "react-router-dom";

function HomePage(): JSX.Element {
  return (
    <div className="jumbotron">
      <h1>Pluralsight Administration</h1>
      <p>React, Redux, React router</p>
      <Link to="about" className="btn btn-primary btn-lg">
        Learn More
      </Link>
    </div>
  );
}

export default HomePage;
