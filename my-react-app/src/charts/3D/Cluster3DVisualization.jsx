import { useEffect, useState } from "react";

function Cluster3DVisualization() {
  const [plotReady, setPlotReady] = useState(false);

  useEffect(() => {
    // Importa dinamicamente o Plotly para evitar problemas de carregamento
    import("plotly.js-dist").then((Plotly) => {
      fetch("/pca_clusters.json")
        .then((res) => res.json())
        .then((data) => {
          const { points, cluster_labels } = data;

          const clusterColors = {
            0: "#FF3CC7",
            1: "#F0F600",
            2: "#00E5E8",
            3: "#DD1C1A",
            4: "#5E2BFF",
          };

          // Separa coordenadas
          const x = points.map(p => p[0]);
          const y = points.map(p => p[1]);
          const z = points.map(p => p[2]);

          // Agrupa por cluster
          const traces = {};
          for (let i = 0; i < cluster_labels.length; i++) {
            const label = cluster_labels[i];
            if (!traces[label]) traces[label] = { x: [], y: [], z: [] };
            traces[label].x.push(x[i]);
            traces[label].y.push(y[i]);
            traces[label].z.push(z[i]);
          }

          const plotTraces = Object.keys(traces).map(label => ({
            type: "scatter3d",
            mode: "markers",
            name: `Cluster ${label}`,
            x: traces[label].x,
            y: traces[label].y,
            z: traces[label].z,
            marker: { size: 4, color: clusterColors[label], opacity: 0.8 }
          }));

          const layout = {
            title: "Clusters visualization of students habits using PCA",
            scene: {
              xaxis: { title: "PC1" },
              yaxis: { title: "PC2" },
              zaxis: { title: "PC3" }
            },
            margin: { l: 0, r: 0, b: 0, t: 40 },
            legend: { title: { text: "Cluster" } }
          };

          // Garante que o elemento existe antes de plotar
          const element = document.getElementById("3d-plot");
          if (element) {
            Plotly.default.newPlot(element, plotTraces, layout, { responsive: true });
            setPlotReady(true);
          }
        })
        .catch(err => console.error("Erro no PCA JSON:", err));
    });
  }, []);

  return (
    <div className="basic-card" style={{ height: "600px", width: "100%", padding: "0", overflow: "hidden" }}>
      {!plotReady && <div style={{ textAlign: "center", paddingTop: "280px" }}>Carregando gráfico 3D...</div>}
      <div id="3d-plot" style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default Cluster3DVisualization;