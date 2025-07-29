import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function OverviewChart({ transactions }) {
  const categories = {};

  let incomeTotal = 0;
  let expenseTotal = 0;

  transactions.forEach((t) => {
    if (!categories[t.category]) {
      categories[t.category] = 0;
    }
    categories[t.category] += t.amount;

    if (t.type === "income") incomeTotal += t.amount;
    if (t.type === "expense") expenseTotal += t.amount;
  });

  const pieData = {
    labels: ["Доходы", "Расходы"],
    datasets: [
      {
        label: "Баланс",
        data: [incomeTotal, expenseTotal],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  const barData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Категории",
        data: Object.values(categories),
        backgroundColor: "#2196f3",
      },
    ],
  };

  return (
    <div>
      <h4>Диаграмма доходов/расходов</h4>
      <Pie data={pieData} />

      <h4>Структура по категориям</h4>
      <Bar data={barData} />
    </div>
  );
}

export default OverviewChart;
