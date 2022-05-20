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
  const [noOfEmployees, setNoOfEmployees] = useState(null);
  const [months, setMonths] = useState(null);
  const [salaryPerEmployee, setSalaryPerEmployee] = useState(null);
  const [totalCostOfLabor, setTotalCostOfLabor] = useState(0);
  // const [overheadValues, setOverheadValues] = useState(0);
  const [overheadRows, setOverheadRows] = useState([]);
  const [overheadDescription, setOverheadDescription] = useState(null);
  const [overheadValue, setOverheadValue] = useState(null);
  const [totalOverheads, setTotalOverheads] = useState(0);
  const [totalBuildCost, setTotalBuildCost] = useState(0);
  const [buyCost, setBuyCost] = useState(null);
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
      if (buyCost != null && totalBuildCost != null) {
        if (buyCost > totalBuildCost) {
          setResult("It would be cheaper to BUILD");
        } else {
          setResult("It would be cheaper to BUY");
        }
      } else {
        setResult("please enter the required data and press calculate");
        alert("please enter the required data and press calculate");
      }
    },
  }));

  useEffect(() => {
    if (noOfEmployees != null && months != null && salaryPerEmployee != null) {
      console.log("here in ue-1");
      setTotalCostOfLabor(noOfEmployees * months * salaryPerEmployee);
    }
  }, [noOfEmployees, months, salaryPerEmployee]);
  useEffect(() => {
    console.log("u4-3");
    console.log(totalOverheads + totalCostOfLabor);
    setTotalBuildCost(parseInt(totalOverheads) + parseInt(totalCostOfLabor));
  }, [totalCostOfLabor, totalOverheads]);

  // useEffect(() => {
  //   // setTotalOverheads((prev) => overheadValue);
  //   console.log("in ue-2");
  //   console.log(overheadValue);
  // }, [overheadValue]);

  const addOverHead = () => {
    console.log("here");

    let row = (
      <AddedRow
        name={overheadDescription}
        value={overheadValue}
        color="#009dcf"
      />
    );
    setOverheadRows((prev) => [...prev, row]);
    if (totalOverheads != null)
      setTotalOverheads((prev) => parseInt(prev) + parseInt(overheadValue));
    else setTotalOverheads(overheadValue);
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
      <SectionHeading name="Labor" />
      <StatementRow
        name="Number of Employees"
        value={noOfEmployees}
        setValue={setNoOfEmployees}
        color="#009dcf"
      />
      <StatementRow
        name="Months to Build"
        value={months}
        setValue={setMonths}
        color="#009dcf"
      />
      <StatementRow
        name="Monthly Salary per Employee"
        value={salaryPerEmployee}
        setValue={setSalaryPerEmployee}
        color="#009dcf"
      />
      <SectionTotalRow
        name="Total Cost of Labor"
        unEditable={true}
        value={totalCostOfLabor}
      />
      <SectionHeading name="Overheads" />
      {overheadRows}

      {addRow ? (
        <AddRowForm
          description={overheadDescription}
          setDescription={setOverheadDescription}
          value={overheadValue}
          setValue={setOverheadValue}
          add={addOverHead}
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
          <StyledSpan style={{ color: "grey" }} unNested={props.unNested}>
            +ADD
          </StyledSpan>
        </a>
      </div>
      <SectionTotalRow
        type="string"
        name="Total Overheads"
        value={totalOverheads}
        unEditable={true}
      />
      <SectionTotalRow
        type="string"
        name="Total Build Cost"
        value={totalBuildCost}
        unEditable={true}
      />
      <SectionTotalRow name="Buy Cost" value={buyCost} setValue={setBuyCost} />
    </>
  );
});

export default Index;
