import React from "react";

function Alert({text}) {
  return (
    <div className="alert alert-danger" role="alert">
      {text}
    </div>
  );
}

export default Alert;
