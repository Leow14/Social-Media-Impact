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

// Função para calcular outliers usando o método IQR (1.5)
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

function OutlierVisualization() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("/Teen_Mental_Health_Dataset.csv")
      .then((response) => response.text())
      .then((csvText) => {
        const rows = csvText.trim().split("\n");
        const headers = rows[0].split(",");

        // Detecta o nome da coluna que contém horas de uso diário
        const possibleNames = [
          "daily_social_media_hours",
          "daily_social_media_use",
          "social_media_hours",
          "daily_usage_hours",
        ];
        let colName = null;
        for (const name of possibleNames) {
          if (headers.includes(name)) {
            colName = name;
            break;
          }
        }
        if (!colName) {
          console.error("Coluna de horas diárias não encontrada. Headers:", headers);
          return;
        }

        const data = rows.slice(1).map((row) => {
          const values = row.split(",");
          return headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
          }, {});
        });

        const dailyHours = data
          .map((row) => parseFloat(row[colName]))
          .filter((val) => !isNaN(val));

        if (dailyHours.length === 0) {
          console.error("Nenhum dado numérico na coluna", colName);
          return;
        }

        const outliers = findOutliers(dailyHours);
        const outlierSet = new Set(outliers);

        // Prepara pontos para o scatter plot
        // Adiciona um pequeno jitter no eixo Y para separar os pontos (valores entre 0.8 e 1.2)
        const normalPoints = [];
        const outlierPoints = [];

        dailyHours.forEach((hours) => {
          const jitter = 0.8 + Math.random() * 0.4; // entre 0.8 e 1.2
          if (outlierSet.has(hours)) {
            outlierPoints.push({ x: hours, y: jitter });
          } else {
            normalPoints.push({ x: hours, y: jitter });
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
      })
      .catch((error) => console.error("Erro ao carregar CSV:", error));
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Daily Social Media Hours - Outliers em vermelho",
        font: { size: 22 },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Horas: ${context.parsed.x.toFixed(2)}`;
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
          text: "Hours per day",
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
        ticks: { display: false }, // esconde os ticks do eixo Y pois não têm significado real
        min: 0.5,
        max: 1.5,
      },
    },
  };

  if (!chartData) return <div className="basic-card">Carregando visualização...</div>;

  return (
    <div className="basic-card" style={{ height: "500px" }}>
      <Scatter data={chartData} options={options} />
    </div>
  );
}

export default OutlierVisualization;