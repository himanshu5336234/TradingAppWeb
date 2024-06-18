import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function PnlLineChart({ graphData }: { graphData: { labels: string[]; datasetOne: number[]; datasetTwo: number[] } }) {
  const datasetOne = graphData.datasetOne;
  const datasetTwo = graphData.datasetTwo;
  return (
    <Line
      options={{
        responsive: true,
        maintainAspectRatio: true,
        interaction: {
          intersect: false,
          axis: "x",
          mode: "nearest"
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            displayColors: true,
            usePointStyle: true,
            cornerRadius: 4,
            padding: 12,
            backgroundColor: "#383840",
            titleFont: { size: 14, weight: "bold" },
            bodyFont: {
              size: 10,
              weight: "bold"
            },
            bodyAlign: "left",
            bodyColor: "#B1B1BA",
            titleColor: "#fff",
            position: "average",
            filter: function (tooltipItem) {
              // disable tooltip for 0th index
              return tooltipItem.dataIndex !== 0;
            }
          }
        },
        scales: {
          y: {
            border: {
              display: true,
              color: "#44444D",
              width: 2
            },
            grid: {
              display: true,
              drawTicks: false,
              lineWidth: function (context) {
                if (context.tick.value === 0) {
                  return 2;
                }
                return 1.8;
              },
              tickColor: "#666673",
              color: function (context) {
                if (context.tick.value === 0) {
                  return "rgba(68, 68, 77, 1)";
                }
                return "rgba(56, 56, 64, 0.2)";
              }
            },
            ticks: {
              maxTicksLimit: 7,
              align: "center",
              padding: 10
            },
            beginAtZero: true
          },
          x: {
            ticks: {
              maxTicksLimit: 7,
              padding: 8,
              align: "start"
            }
          }
        }
      }}
      data={{
        labels: graphData.labels,
        datasets: [
          {
            label: "Gross P&L",
            data: datasetOne,
            borderColor: "#A044FE",
            pointStyle: "circle",
            pointRadius: 0.75,
            borderWidth: 2.5,
            backgroundColor: "#A044FE"
          },
          {
            label: "Net P&L",
            data: datasetTwo,
            borderColor: "#C0DF5A",
            pointStyle: "circle",
            pointRadius: 0.75,
            borderWidth: 2.5,
            backgroundColor: "#C0DF5A"
          }
        ]
      }}
    />
  );
}
