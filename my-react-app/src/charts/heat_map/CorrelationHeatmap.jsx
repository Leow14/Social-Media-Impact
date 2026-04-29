import { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js"
import { MatrixController, MatrixElement } from "chartjs-chart-matrix"
import { Chart } from "react-chartjs-2"

ChartJS.register(LinearScale, Tooltip, Legend, MatrixController, MatrixElement)

const labelMap = {
  daily_social_media_hours: "Social Media",
  screen_time_before_sleep: "Screen Before Sleep",
  sleep_hours: "Sleep",
  stress_level: "Stress",
  anxiety_level: "Anxiety",
  academic_performance: "Academic",
  physical_activity: "Physical",
  addiction_level: "Addiction"
}

const columns = [
  "daily_social_media_hours",
  "screen_time_before_sleep",
  "sleep_hours",
  "stress_level",
  "anxiety_level",
  "academic_performance",
  "physical_activity",
  "addiction_level"
]

function CorrelationHeatmap() {
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    fetch("/Teen_Mental_Health_Dataset.csv")
      .then((res) => res.text())
      .then((csvText) => {
        const rows = csvText.trim().split("\n")
        const headers = rows[0].split(",")

        const data = rows.slice(1).map((row) => {
          const values = row.split(",")

          return headers.reduce((obj, header, index) => {
            const val = parseFloat(values[index])
          obj[header] = isNaN(val) ? null : val
            return obj
          }, {})
        })

        // 🔹 função de correlação (Pearson)
        function correlation(x, y) {
          const n = x.length

          const meanX = x.reduce((a, b) => a + b, 0) / n
          const meanY = y.reduce((a, b) => a + b, 0) / n

          let num = 0
          let denX = 0
          let denY = 0

          for (let i = 0; i < n; i++) {
            const dx = x[i] - meanX
            const dy = y[i] - meanY
            num += dx * dy
            denX += dx * dx
            denY += dy * dy
          }

          return num / Math.sqrt(denX * denY)
        }

        // 🔹 matriz de correlação
        const matrix = []

        columns.forEach((col1, i) => {
          columns.forEach((col2, j) => {
            const x = data.map((row) => row[col1])
            const y = data.map((row) => row[col2])

            const corr = correlation(x, y)

            matrix.push({
              x: i,
              y: j,
              v: corr
            })
          })
        })

        setChartData({
          datasets: [
            {
              label: "Correlation Heatmap",
              data: matrix,
              width: ({ chart }) =>
                (chart.chartArea || {}).width / columns.length,
              height: ({ chart }) =>
                (chart.chartArea || {}).height / columns.length,
              backgroundColor: (ctx) => {
                const value = ctx.raw.v

                const intensity = Math.pow(Math.abs(value), 0.4)
                const alpha = Math.max(intensity, 0.15)

                return value > 0
                  ? `rgba(34,197,94,${alpha})`
                  : `rgba(239,68,68,${alpha})`
              }
            }
          ]
        })
      })
  }, [])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      layout: {
        padding: {
          top: 70,   // 🔥 aumenta esse valor
          left: 10,
          right: 10,
          bottom: 10
        }
      },
      tooltip: {
        callbacks: {
          title: () => "",
          label: (ctx) => {
            const { x, y, v } = ctx.raw
            return `${labelMap[columns[x]]} x ${labelMap[columns[y]]}: ${v.toFixed(2)}`
          }
        }
      },
      legend: { display: false }
    },
    scales: {
      x: {
        type: "linear",
        position: "top",
        offset: true,
        ticks: {
          callback: (val) => labelMap[columns[val]],
          maxRotation: 60,
          minRotation: 60,
          autoSkip: false,
          font: { size: 11 }
        }
      },
      y: {
        offset: true,   // 🔥 MESMA COISA
        ticks: {
          callback: (val) => labelMap[columns[val]],
          font: { size: 11 }
        }
      }
    }
  }

  return (
    <div className="basic-card heatmap-card">
      {chartData && <Chart type="matrix" data={chartData} options={options} />}
    </div>
  )
}

export default CorrelationHeatmap