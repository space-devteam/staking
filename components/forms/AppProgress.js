import React, { Fragment } from "react";

const AppProgress = ({ percent }) => {
  return (
    <Fragment>
      <div className="app-progress">
        <div style={{ width: `${percent}%` }} className="app-progress__bar"></div>
      </div>
    </Fragment>
  );
};

export default AppProgress;
