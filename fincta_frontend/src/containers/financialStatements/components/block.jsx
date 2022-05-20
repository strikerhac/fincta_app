import React, { useState, useEffect } from "react";
import { SectionHeading, SectionTotalRow } from "./components";
import SubBlock from "./subBlock";

const Block = ({ heading, data, summary }) => {
  const [block, setBlock] = useState([]);
  const [blockTotal, setBlockTotal] = useState(0.0);
  useEffect(() => {
    setBlock(objProcessor(data));
  }, [data, summary]);

  const objProcessor = (obj) => {
    let renderArray = [];
    for (const [key, value] of Object.entries(obj)) {
      renderArray.push(
        <SubBlock
          summary={summary}
          heading={key}
          data={value}
          blockTotal={blockTotal}
          setBlockTotal={setBlockTotal}
        />
      );
    }
    return renderArray;
  };

  return (
    <>
      <SectionHeading name={heading} />
      {block}
      <SectionTotalRow name={`Total ${heading}`} value={blockTotal} />
    </>
  );
};

export default Block;
