import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { SummaryDetails } from "../financialStatements/components/components";
import { SectionTotalRow } from "./components/build";

const Index = forwardRef((props, ref) => {
  const [payment, setPayment] = useState(0);
  const [impressions, setImpressions] = useState(0);
  const [costPerImpression, setCostPerImpression] = useState(0);
  const [result, setResult] = useState(
    "please enter the required data and press calculate"
  );

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({
    calculate() {
      console.log("in calculate");
      if (costPerImpression > 0 && costPerImpression !== Infinity) {
        setResult(
          `It would takes ${costPerImpression} ${
            costPerImpression > 1 ? "months" : "month"
          } to recover cost of acquisition from a customer`
        );
      } else {
        setResult("please enter the required data and press calculate");
        alert("please enter the required data and press calculate");
      }
    },
  }));

  useEffect(() => {
    if (payment !== 0 && impressions !== 0) {
      console.log("here in ue-1");
      setCostPerImpression(payment / (impressions / 1000));
    }
  }, [payment, impressions]);

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
        name="Payment to the Influencer"
        value={payment}
        setValue={setPayment}
      />
      <SectionTotalRow
        name="Total Impression"
        value={impressions}
        setValue={setImpressions}
      />
      <SectionTotalRow
        name="Cost per 000's Impression"
        value={costPerImpression}
        unEditable={true}
      />
    </>
  );
});

export default Index;
