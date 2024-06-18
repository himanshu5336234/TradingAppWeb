import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import propTypes from "prop-types";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChartComponent({ yAxes, xAxes }) {
  const labels = xAxes;
  const positiveSlop = (ctx) => {
    return ctx.p0.parsed.y <= ctx.p1.parsed.y ? "#29B57E" : undefined;
  };
  const negativeSlop = (ctx) => {
    return ctx.p0.parsed.y > ctx.p1.parsed.y ? "#F46151" : undefined;
  };
  const data = {
    labels,
    datasets: [
      {
        data: [...yAxes],
        segment: {
          borderColor: (ctx) => {
            return positiveSlop(ctx) || negativeSlop(ctx);
          }
        },
        backgroundColor: ["#F46151", "#29B57E"]
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,

    scales: {
      x: {
        title: {
          display: true,
          // text: "Days",
          color: "white"
        },
        ticks: { color: "#A9A9A9", beginAtZero: true, display: false }
      },
      y: {
        title: {
          display: true,
          // text: "Trade",
          color: "white"
        },
        ticks: { color: "#A9A9A9", beginAtZero: true, display: false }
      }
    },
    elements: {
      point: {
        radius: 0
      }
    },
    plugins: {
      legend: {
        display: false,
        position: "bottom"
      }
    }
  };

  return <Line options={options} data={data} />;
}
LineChartComponent.propTypes = {
  yAxes: propTypes.array,
  xAxes: propTypes.array
};

export default LineChartComponent;
