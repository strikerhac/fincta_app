import React from "react";
import { StatementRow } from "./components";

function row(props) {
  return (
    <StatementRow
      name={props.title}
      value={props.value}
      color="#009dcf"
      mL="40px"
    />
  );
}

export default row;
