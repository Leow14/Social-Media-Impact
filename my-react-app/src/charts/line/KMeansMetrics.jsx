import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function KMeansMetrics() {
  const [inertiaData, setInertiaData] = useState(null);
  const [silhouetteData, setSilhouetteData] = useState(null);

  useEffect(() => {
    fetch("/kmeans_metrics.json")
      .then((res) => res.json())
      .then((data) => {
        const { k_values, inertia, silhouette_scores } = data;

        setInertiaData({
          labels: k_values,
          datasets: [
            {
              label: "Inertia",
              data: inertia,
              borderColor: "#16697A",
              backgroundColor: "transparent",
              pointBackgroundColor: "#16697A",
              pointBorderColor: "#16697A",
              tension: 0.1,
              fill: false,
            },
          ],
        });

        setSilhouetteData({
          labels: k_values,
          datasets: [
            {
              label: "Silhouette Score",
              data: silhouette_scores,
              borderColor: "#FFA62B",
              backgroundColor: "transparent",
              pointBackgroundColor: "#FFA62B",
              pointBorderColor: "#FFA62B",
              tension: 0.1,
              fill: false,
            },
          ],
        });
      })
      .catch((err) => console.error("Erro ao carregar métricas:", err));
  }, []);

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.raw.toFixed(2)}` } },
      legend: { position: "top" },
    },
    scales: {
      x: { title: { display: true, text: "Number of clusters (k)" }, ticks: { stepSize: 1 } },
      y: { title: { display: true, text: "Score" } },
    },
  };

  if (!inertiaData || !silhouetteData)
    return <div className="basic-card">Carregando métricas...</div>;

  return (
    <div style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}>
      <div className="basic-card" style={{ flex: 1, minWidth: "300px" }}>
        <Line data={inertiaData} options={{ ...commonOptions, plugins: { ...commonOptions.plugins, title: { display: true, text: "K-means inertia (Elbow method)" } } }} />
      </div>
      <div className="basic-card" style={{ flex: 1, minWidth: "300px" }}>
        <Line data={silhouetteData} options={{ ...commonOptions, plugins: { ...commonOptions.plugins, title: { display: true, text: "Silhouette scores" } } }} />
      </div>
    </div>
  );
}

export default KMeansMetrics;