import { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js"
import { MatrixController, MatrixElement } from "chartjs-chart-matrix"
import { Chart } from "react-chartjs-2"

ChartJS.register(MatrixController, MatrixElement, LinearScale, Tooltip, Legend)

const corrColumns = [
  "daily_social_media_hours",
  "screen_time_before_sleep",
  "sleep_hours",
  "stress_level",
  "depression_label",
  "anxiety_level",
  "academic_performance",
  "physical_activity",
  "addiction_level"
]

// Pearson correlation
function correlation(x, y) {
  const n = x.length
  const meanX = x.reduce((a, b) => a + b) / n
  const meanY = y.reduce((a, b) => a + b) / n

  const num = x.reduce((sum, xi, i) => sum + (xi - meanX) * (y[i] - meanY), 0)
  const den = Math.sqrt(
    x.reduce((sum, xi) => sum + (xi - meanX) ** 2, 0) *
    y.reduce((sum, yi) => sum + (yi - meanY) ** 2, 0)
  )

  return num / den
}

function CorrelationHeatmap() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("/Teen_Mental_Health_Dataset.csv")
      .then(res => res.text())
      .then(text => {
        const rows = text.trim().split("\n")
        const headers = rows[0].split(",")

        const parsed = rows.slice(1).map(row => {
          const values = row.split(",")
          return headers.reduce((obj, h, i) => {
            obj[h] = parseFloat(values[i]) || 0
            return obj
          }, {})
        })

        const matrixData = []

        corrColumns.forEach((colX, i) => {
          corrColumns.forEach((colY, j) => {
            const x = parsed.map(r => r[colX])
            const y = parsed.map(r => r[colY])
            const corr = correlation(x, y)

            matrixData.push({
              x: i,
              y: j,
              v: corr
            })
          })
        })

        setData({
          datasets: [{
            label: "Correlation Matrix",
            data: matrixData,
            backgroundColor: (ctx) => {
              const value = ctx.dataset.data[ctx.dataIndex].v
              const alpha = Math.abs(value)
              return value > 0
                ? `rgba(75,192,192,${alpha})`
                : `rgba(255,99,132,${alpha})`
            },
            width: ({ chart }) => chart.chartArea.width / corrColumns.length,
            height: ({ chart }) => chart.chartArea.height / corrColumns.length
          }]
        })
      })
  }, [])

  return (
    <div className="basic-card">
      {data && <Chart type="matrix" data={data} />}
    </div>
  )
}

export default CorrelationHeatmap