import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { SummaryDetails } from "../financialStatements/components/components";
import { SectionTotalRow } from "./components/build";

const Index = forwardRef((props, ref) => {
  const [acqCost, setAcqCost] = useState(0);
  const [spending, setSpending] = useState(0);
  const [recoveryTime, setRecoveryTime] = useState(0);
  const [result, setResult] = useState(
    "please enter the required data and press calculate"
  );

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({
    calculate() {
      console.log("in calculate");
      if (recoveryTime > 0 && recoveryTime !== Infinity) {
        setResult(
          `It would takes ${recoveryTime} ${
            recoveryTime > 1 ? "months" : "month"
          } to recover cost of acquisition from a customer`
        );
      } else {
        setResult("please enter the required data and press calculate");
        alert("please enter the required data and press calculate");
      }
    },
  }));

  useEffect(() => {
    if (acqCost !== 0 && spending !== 0) {
      console.log("here in ue-1");
      setRecoveryTime(acqCost / spending);
    }
  }, [acqCost, spending]);

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
        name="Average Customer Acquisition Cost"
        value={acqCost}
        setValue={setAcqCost}
      />
      <SectionTotalRow
        name="Average Customer Spending per month"
        value={spending}
        setValue={setSpending}
      />
      <SectionTotalRow
        name="CAC Recovery Time"
        value={recoveryTime}
        unEditable={true}
      />
    </>
  );
});

export default Index;
