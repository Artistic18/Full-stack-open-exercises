import React from "react";

const Alert = ({message, className}) => {
    if ( message == null)
      return null;
    return <div className={className}>{message}</div>
};

export default Alert;