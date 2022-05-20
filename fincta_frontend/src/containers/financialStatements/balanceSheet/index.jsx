import React, { useState, useEffect } from "react";
import Block from "../components/block";
import { StatementRow } from "../components/components";
import BalanceSheetView from "./view";
import axios, { baseUrl } from "../../../utils/axios";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [blocks, setBlocks] = useState([]);
  const [equity, setEquity] = useState([]);
  const [summary, setSummary] = useState(false);
  const [data, setData] = useState({
    assets: {
      currentAssets: {},
      nonCurrentAssets: {},
    },

    liabilities: {
      currentLiabilities: {},
      nonCurrentLiabilities: {},
    },

    equity: {},

    totals: {
      totalCurrentAssets: 0,
      totalNonCurrentAssets: 0,
      totalAssets: 0,
      totalCurrentLiabilities: 0,
      totalNonCurrentLiabilities: 0,
      totalLiabilities: 0,
      totalEquity: 0,
      totalLiabilitiesAndEquity: 0,
    },
  });

  const handleSubmit = async () => {
    setLoading(true);
    await axios
      .get(`${baseUrl}/getters/balanceSheet/${date}`)
      .then((res) => {
        console.log(res);
        setData(res.data);
        getEquity(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const getBlock = (heading, data, summary) => {
    console.log("in block");
    console.log(data);
    console.log(summary);

    let renderArray = [];
    renderArray.push(<Block data={data} heading={heading} summary={summary} />);

    return renderArray;
  };

  const getEquity = (data) => {
    let tempEquity = [];
    for (const [key, value] of Object.entries(data["equity"])) {
      tempEquity.push(
        <StatementRow name={key} value={value} color="#009dcf" />
      );
    }
    setEquity(tempEquity);
  };

  return (
    <BalanceSheetView
      summary={summary}
      setSummary={setSummary}
      data={data}
      equity={equity}
      totalEquity={data.totals.totalEquity}
      date={date}
      setDate={setDate}
      handleSubmit={handleSubmit}
      getBlock={getBlock}
    />
  );
};

export default Index;
