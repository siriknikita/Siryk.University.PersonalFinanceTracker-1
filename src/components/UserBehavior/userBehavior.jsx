import React, { useContext, useLayoutEffect, useState } from "react";
import Chart from "react-apexcharts";
import { LoadingContet } from "../../scenes/dashboard";
import { getUsersSpending } from "../../utils/categories";

const UserBehavior = () => {
  const [moneySpentData, setMoneySpentData] = useState({});
  const { setShowPieChart } = useContext(LoadingContet);

  useLayoutEffect(() => {
    async function fetchData() {
      const data = await getUsersSpending();
      setMoneySpentData(data.usersSpending);
      setShowPieChart(true);
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  const categoriesNames = Object.keys(moneySpentData);
  const moneySpentOnCategories = Object.values(moneySpentData);

  const data = {
    series: moneySpentOnCategories,
    options: {
      chart: {
        foreColor: "#CCC",
        width: 380,
        type: "pie",
      },
      labels: categoriesNames,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <Chart
        options={data.options}
        series={data.series}
        type="pie"
        height="100%"
        width="30%"
      />
    </>
  );
};

export default UserBehavior;