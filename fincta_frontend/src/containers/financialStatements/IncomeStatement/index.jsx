import React, { useState, useContext, useEffect } from "react";
import IncomeStatementView from "./view";
import { StatementRow } from "../components/components";
import axios, { baseUrl } from "../../../utils/axios";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import moment from "moment";
const Index = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    revenue: {},
    totalRevenue: 0,
    cogs: 0,
    grossProfit: 0,

    otherIncome: {},
    totalOtherIncome: 0,

    otherExpense: {},
    totalOtherExpense: 0,
    netProfit: 0,
  });
  const [revenue, setRevenue] = useState([]);
  const [otherIncome, setOtherIncome] = useState([]);
  const [otherExpense, setOtherExpense] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [summary, setSummary] = useState(false);

  useEffect(() => {
    fillRenderArrays(data);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    await axios
      .get(`${baseUrl}/getters/incomeStatement/${startDate}/${endDate}`)
      .then((res) => {
        console.log(res);
        setData(res.data);
        fillRenderArrays(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const getImg = () => {
    html2canvas(document.querySelector("#root")).then((canvas) => {
      var img = canvas.toDataURL();
      saveAs(img, "pretty image.png");
    });
  };

  const getPdf = () => {
    let input = document.querySelector("#root");
    html2canvas(input, { scrollY: -window.scrollY, scale: 1 }).then(
      (canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("download.pdf");
      }
    );
  };

  const fillRenderArrays = (data) => {
    let tempRevenue = [];
    let tempOtherIncome = [];
    let tempOtherExpense = [];
    for (const [key, value] of Object.entries(data["revenue"])) {
      tempRevenue.push(
        <StatementRow name={key} value={value} color="#009dcf" />
      );
    }

    for (const [key, value] of Object.entries(data["otherIncome"])) {
      tempOtherIncome.push(
        <StatementRow name={key} value={value} color="#009dcf" />
      );
    }

    for (const [key, value] of Object.entries(data["otherExpense"])) {
      tempOtherExpense.push(
        <StatementRow name={key} value={value} color="#009dcf" />
      );
    }

    setRevenue(tempRevenue);
    setOtherIncome(tempOtherIncome);
    setOtherExpense(tempOtherExpense);
  };

  return (
    <IncomeStatementView
      summary={summary}
      setSummary={setSummary}
      loading={loading}
      handleSubmit={handleSubmit}
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
      revenue={revenue}
      otherIncome={otherIncome}
      otherExpense={otherExpense}
      data={data}
      getPdf={getPdf}
    />
  );
};

export default Index;
