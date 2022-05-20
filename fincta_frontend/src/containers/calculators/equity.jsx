import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { SummaryDetails } from "../financialStatements/components/components";
import { SectionTotalRow } from "./components/build";

const Index = forwardRef((props, ref) => {
  const [amount, setAmount] = useState(0);
  const [stake, setStake] = useState(0);
  const [preVal, setPreVal] = useState(0);
  const [postVal, setPostVal] = useState(0);
  const [result, setResult] = useState(
    "please enter the required data and press calculate"
  );

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({
    calculate() {
      console.log("in calculate");
      if (
        preVal > 0 &&
        preVal !== Infinity &&
        postVal > 0 &&
        postVal !== Infinity
      ) {
        setResult(
          `Pre-acquisition Valuation = ${preVal} and Post-acquisition Valuation = ${postVal}`
        );
      } else {
        setResult("please enter the required data and press calculate");
        alert("please enter the required data and press calculate");
      }
    },
  }));

  useEffect(() => {
    if (amount !== 0 && stake !== 0) {
      setPreVal(amount / (stake / 100) - amount);
      setPostVal(amount / (stake / 100));
    }
  }, [amount, stake]);

  return (
    <>
      <div
        style={{
          padding: "20px 10px 10px 20px",
          fontSize: "clamp(10px, 3vw, 20px",
          fontWeight: "bolder",
          textAlign: "center",
        }}
      >
        {result}
      </div>

      {/* <SummaryDetails /> */}
      <SectionTotalRow
        name="Amount Offered"
        value={amount}
        setValue={setAmount}
      />
      <SectionTotalRow
        name="Ownership Stake"
        value={stake}
        setValue={setStake}
      />
      <SectionTotalRow
        name="Pre-acquisition Valuation"
        value={preVal}
        unEditable={true}
      />
      <SectionTotalRow
        name="Post-acquisition Valuation"
        value={postVal}
        unEditable={true}
      />
    </>
  );
});

export default Index;
