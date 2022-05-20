import React, { useState, useEffect } from "react";
import { SectionHeading, SectionTotalRow } from "./components";
import Row from "./row";

const SubBlock = ({ data, unNested, setBlockTotal, heading, summary }) => {
  const [subBlock, setSubBlock] = useState([]);
  const [subBlockTotal, setSubBlockTotal] = useState(0.0);

  useEffect(() => {
    let sb = objProcessor(data);
    setSubBlock(sb[0]);
    setSubBlockTotal(sb[1]);
    if (!unNested) {
      setBlockTotal((prev) =>
        (parseFloat(prev) + parseFloat(sb[1])).toFixed(2)
      );
    }
  }, [data, summary]);

  const objProcessor = (obj) => {
    let counter = 0.0;
    let renderArray = [];
    for (const [key, value] of Object.entries(obj)) {
      counter = counter + parseFloat(value);
      renderArray.push(<Row title={key} value={value} />);
    }
    return [renderArray, counter.toFixed(2)];
  };

  return (
    <>
      {summary ? (
        <SectionTotalRow name={`${heading}`} value={subBlockTotal} mL="20px" />
      ) : (
        <>
          <SectionHeading
            name={heading}
            bgColor="#f8f8ff"
            bT={false}
            mL="20px"
          />
          {subBlock}
          <SectionTotalRow
            name={`Total ${heading}`}
            value={subBlockTotal}
            mL="20px"
          />
        </>
      )}
    </>
  );
};

export default SubBlock;
