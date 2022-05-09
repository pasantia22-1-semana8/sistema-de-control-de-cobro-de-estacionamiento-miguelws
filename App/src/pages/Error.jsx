import React from "react";

import "./styles/Error.css";

export default function Error(props) {
  return (
    <div className="PageError">
      {props.error.message}
    </div>
  );
}