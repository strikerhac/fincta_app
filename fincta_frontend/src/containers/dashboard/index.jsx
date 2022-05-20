import React, { useState, useEffect, useContext } from "react";
import DashBoardView from "./view";
import axios, { baseUrl } from "../../utils/axios";
import { DropDownOptionsContext } from "../../context/optionsContext";

const Index = (props) => {
  const [data, setData] = useState(null);
  const [period, setPeriod] = useState("week");
  const [loading, setLoading] = useState(false);
  const { dashboardData, getDashboardData } = useContext(
    DropDownOptionsContext
  );

  useEffect(() => {
    const apis = async () => {
      if (!dashboardData.length) {
        setLoading(true);
        await getDashboardData(period);
        setLoading(false);
      }
      // await axios
      //   .get(`${baseUrl}/getters/dashboard/${period}`)
      //   .then((res) => {
      //     console.log(res);
      //     setData(res.data);
      //     setLoading(false);
      //   })
      //   .catch((err) => {
      //     setLoading(false);
      //     console.log(err);
      //   });
    };
    apis();
  }, [period]);

  return (
    <DashBoardView
      data={dashboardData}
      setPeriod={setPeriod}
      loading={loading}
    />
  );
};

export default Index;
