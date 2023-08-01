import React from "react";
import { Link } from "react-router-dom";

// fonts awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

function PageNotFound() {
  return (
    <div>
      <h1 className="mt-5">
        <span className="text-warning">
          <FontAwesomeIcon icon={faTriangleExclamation} />
        </span>{" "}
        Page Not Found !
      </h1>
      Go to Home page : <Link to="/">Home Page</Link>
    </div>
  );
}

export default PageNotFound;
