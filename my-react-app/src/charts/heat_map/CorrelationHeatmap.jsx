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

  const [mode, setMode] = useState("overall")
  const [selectedGroup, setSelectedGroup] = useState("all")

  useEffect(() => {
    fetch("/Teen_Mental_Health_Dataset.csv")
      .then((res) => res.text())
      .then((csvText) => {
        const rows = csvText.trim().split("\n")
        const headers = rows[0].split(",")

        const data = rows.slice(1).map((row) => {
        const values = row.split(",")

        const obj = headers.reduce((acc, header, index) => {
          const val = parseFloat(values[index])
          acc[header] = isNaN(val) ? null : val
          return acc
        }, {})

        // usage_group
        if (obj.daily_social_media_hours !== null) {
          if (obj.daily_social_media_hours < 2) obj.usage_group = "low"
          else if (obj.daily_social_media_hours < 5) obj.usage_group = "medium"
          else obj.usage_group = "high"
        }

        return obj
      })

        function getFilteredData(data) {
  let filtered = data

  if (mode === "age") {
    filtered = data.map((row) => {
      const age = row.age

      let age_group = null
      if (age >= 13 && age <= 15) age_group = "13-15"
      else if (age >= 16 && age <= 19) age_group = "16-19"

      return { ...row, age_group }
    })

    if (selectedGroup !== "all") {
      filtered = filtered.filter(
        (row) => row.age_group === selectedGroup
      )
    }
  }

  // USAGE GROUP
  if (mode === "usage") {
    if (selectedGroup !== "all") {
      filtered = data.filter(
        (row) => row.usage_group === selectedGroup
      )
    }
  }

  return filtered
}

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

            const filteredData = getFilteredData(data)

            const validPairs = filteredData
              .map(row => [row[col1], row[col2]])
              .filter(([a, b]) => a !== null && b !== null)

            const x = validPairs.map(v => v[0])
            const y = validPairs.map(v => v[1])

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
  }, [mode, selectedGroup])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      layout: {
        padding: {
          top: 70,
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
        offset: true,
        ticks: {
          callback: (val) => labelMap[columns[val]],
          font: { size: 11 }
        }
      }
    }
  }

  return (
    <div className="basic-card heatmap-card">

      {/* CONTROLES */}
      <div style={{ marginBottom: "10px" }}>
        <select
          value={mode}
          onChange={(e) => {
            setMode(e.target.value)
            setSelectedGroup("all")
          }}
        >
          <option value="overall">Overall</option>
          <option value="age">Age Group</option>
          <option value="usage">Usage Group</option>
        </select>

        {mode === "age" && (
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="all">All</option>
            <option value="13-15">13-15</option>
            <option value="16-19">16-19</option>
          </select>
        )}

        {mode === "usage" && (
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        )}
      </div>

      {chartData && <Chart type="matrix" data={chartData} options={options} />}
    </div>
  )
}

export default CorrelationHeatmap