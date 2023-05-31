import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const VerticalBarChart = ({ data = [], className = "" }) => {
  const chartData = {
    labels: data.map((item) => item.display || item._id),

    datasets: [
      {
        label: "Staffing Profile",
        data: data.map((item) => item.data),
        backgroundColor: ["#0f172a"],
        hoverBackgroundColor: ["#0f172a"],
        barPercentage: 0.9,
      },
    ],
  };

  return (
    <div className={`p-1 ${className}`}>
      <Bar
        data={chartData}
        options={{
          indexAxis: "x",
          responsive: true,
        }}
      />
    </div>
  );
};

export default VerticalBarChart;
