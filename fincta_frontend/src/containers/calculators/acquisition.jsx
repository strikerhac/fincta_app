import React, {
  useState,
  useEffect,
  useContext,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { StyledSpan } from "../financialStatements/styles/main.styles";
import {
  SectionHeading,
  SummaryDetails,
  IncomeCalculator,
} from "../financialStatements/components/components";
import {
  AddRowForm,
  StatementRow,
  AddedRow,
  SectionTotalRow,
} from "./components/build";

const Index = forwardRef((props, ref) => {
  const [channelRows, setChannelRows] = useState([]);
  const [channelDescription, setChannelDescription] = useState(null);
  const [channelValue, setChannelValue] = useState(null);
  const [totalChannelsCost, setTotalChannelsCost] = useState(0);
  const [customerAdded, setCustomerAdded] = useState(0);
  const [cacPerCustomer, setCacPerCustomer] = useState(0);
  const [addRow, setAddRow] = useState(false);
  const [result, setResult] = useState(
    "please enter the required data and press calculate"
  );

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({
    calculate() {
      console.log("in calculate");
      if (cacPerCustomer > 0 && cacPerCustomer !== Infinity) {
        setResult(
          `Using this channel, it would cost you ${cacPerCustomer} to acquire 1 customer`
        );
      } else {
        setResult("please enter the required data and press calculate");
        alert("please enter the required data and press calculate");
      }
    },
  }));

  useEffect(() => {
    if (
      customerAdded != null &&
      customerAdded !== 0 &&
      totalChannelsCost !== 0
    ) {
      console.log("here in ue-1");
      setCacPerCustomer(totalChannelsCost / customerAdded);
    }
  }, [customerAdded, totalChannelsCost]);

  const addChannel = () => {
    console.log("here");

    let row = (
      <AddedRow
        name={channelDescription}
        value={channelValue}
        color="#009dcf"
      />
    );
    setChannelRows((prev) => [...prev, row]);
    if (totalChannelsCost !== 0)
      setTotalChannelsCost((prev) => parseInt(prev) + parseInt(channelValue));
    else setTotalChannelsCost(channelValue);
    setAddRow(false);
  };

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
      <SectionHeading name="Cost of Acquisition Channel" />
      {channelRows}

      {addRow ? (
        <AddRowForm
          description={channelDescription}
          setDescription={setChannelDescription}
          value={channelValue}
          setValue={setChannelValue}
          add={addChannel}
          setAddRow={setAddRow}
          color="#009dcf"
        />
      ) : null}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 20px 10px 0px",
        }}
      >
        <a
          onClick={() => {
            setAddRow(true);
          }}
        >
          <StyledSpan style={{ color: "grey" }} unNested={false}>
            +ADD
          </StyledSpan>
        </a>
      </div>
      <SectionTotalRow
        type="string"
        name="Total Cost of Acquisition Channel"
        value={totalChannelsCost}
        unEditable={true}
      />
      <SectionTotalRow
        name="Average Customer Added"
        value={customerAdded}
        setValue={setCustomerAdded}
      />
      <SectionTotalRow
        type="string"
        name="CAC per Customer"
        value={cacPerCustomer}
        unEditable={true}
      />
    </>
  );
});

export default Index;
