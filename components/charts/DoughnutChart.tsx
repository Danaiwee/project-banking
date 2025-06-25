"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Bank 1", "Bank 2", "Bank 3"],
  datasets: [
    {
      lebel: "Banks",
      data: [1250.5, 2500.33, 3750.99],
      backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
    },
  ],
};

const DoughnutChart = () => {
  return (
    <Doughnut
      data={data}
      options={{
        cutout: "60%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
