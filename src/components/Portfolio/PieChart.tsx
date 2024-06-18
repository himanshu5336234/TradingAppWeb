import { Box, Paper } from "@mui/material";
import React from "react";
import TextView from "../UI/TextView/TextView";
import ToggleGroup from "../UI/ToggleGroup/ToggleGroup";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import MyPieChart from "./PieChart";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface ChartItemInterface {
  data: number[];
  backgroundColors: string[];
  totalVol: number;
}

const PieChart = ({ chartItems }: { chartItems: ChartItemInterface }) => {
  return (
    <Pie
      data={{
        labels: [],
        datasets: [
          {
            label: "",
            data: chartItems.data,
            backgroundColor: chartItems.backgroundColors,
            borderWidth: 0
          }
        ]
      }}
      options={{
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            displayColors: false,
            cornerRadius: 4,
            padding: { top: 6, bottom: 6, right: 4, left: 4 },
            backgroundColor: function (context) {
              return context?.tooltipItems[0]?.dataset?.backgroundColor[context?.tooltipItems[0]?.dataIndex];
            },
            callbacks: {
              label: function (context) {
                const valueInPercent = (context.raw / chartItems.totalVol) * 100;
                return valueInPercent.toFixed(3) + "%";
              }
            },
            bodyFont: {
              size: 14,
              weight: "bold"
            },
            bodyColor: "#000",
            position: "average"
          }
        }
      }}
    />
  );
};

export default PieChart;
