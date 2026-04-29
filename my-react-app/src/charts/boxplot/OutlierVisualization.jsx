import { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LinearScale, PointElement, Title, Tooltip, Legend);

function findOutliers(values) {
  if (values.length === 0) return [];
  const sorted = [...values].sort((a, b) => a - b);
  const q1 = percentile(sorted, 25);
  const q3 = percentile(sorted, 75);
  const iqr = q3 - q1;
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;
  return values.filter((v) => v < lowerFence || v > upperFence);
}

function percentile(sortedArr, p) {
  const index = (p / 100) * (sortedArr.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  if (lower === upper) return sortedArr[lower];
  return sortedArr[lower] * (upper - index) + sortedArr[upper] * (index - lower);
}

function OutlierVisualization({ columnName }) {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!columnName) return;

    fetch("/Teen_Mental_Health_Dataset.csv")
      .then((response) => response.text())
      .then((csvText) => {
        const rows = csvText.trim().split("\n");
        const headers = rows[0].split(",");

        // Verifica se a coluna existe
        if (!headers.includes(columnName)) {
          setError(`Coluna "${columnName}" não encontrada.`);
          return;
        }

        const data = rows.slice(1).map((row) => {
          const values = row.split(",");
          return headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
          }, {});
        });

        const columnValues = data
          .map((row) => parseFloat(row[columnName]))
          .filter((val) => !isNaN(val));

        if (columnValues.length === 0) {
          setError(`Nenhum dado numérico na coluna "${columnName}".`);
          return;
        }

        const outliers = findOutliers(columnValues);
        const outlierSet = new Set(outliers);

        const normalPoints = [];
        const outlierPoints = [];

        columnValues.forEach((value) => {
          const jitter = 0.8 + Math.random() * 0.4;
          if (outlierSet.has(value)) {
            outlierPoints.push({ x: value, y: jitter });
          } else {
            normalPoints.push({ x: value, y: jitter });
          }
        });

        setChartData({
          datasets: [
            {
              label: "Valores normais",
              data: normalPoints,
              backgroundColor: "#36A2EB",
              pointRadius: 4,
              pointHoverRadius: 6,
              type: "scatter",
            },
            {
              label: "Outliers",
              data: outlierPoints,
              backgroundColor: "#FF0000",
              pointRadius: 6,
              pointHoverRadius: 8,
              type: "scatter",
            },
          ],
        });
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setError("Erro ao carregar o arquivo CSV.");
      });
  }, [columnName]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `Outliers em "${columnName}" (vermelho)`,
        font: { size: 22 },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${columnName}: ${context.parsed.x.toFixed(2)}`;
          },
        },
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: columnName,
          font: { size: 14 },
        },
        ticks: { stepSize: 1 },
      },
      y: {
        title: {
          display: true,
          text: "Jitter (apenas para separar pontos)",
          font: { size: 12 },
        },
        ticks: { display: false },
        min: 0.5,
        max: 1.5,
      },
    },
  };

  if (error) return <div className="basic-card" style={{ color: "red" }}>{error}</div>;
  if (!chartData) return <div className="basic-card">Carregando visualização...</div>;

  return (
    <div className="basic-card" style={{ height: "500px" }}>
      <Scatter data={chartData} options={options} />
    </div>
  );
}

export default OutlierVisualization;