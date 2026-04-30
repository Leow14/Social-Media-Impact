import { useEffect, useState } from "react"
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts"

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

const labelMap = {
  daily_social_media_hours: "Social Media",
  screen_time_before_sleep: "Screen",
  sleep_hours: "Sleep",
  stress_level: "Stress",
  anxiety_level: "Anxiety",
  academic_performance: "Academic",
  physical_activity: "Physical",
  addiction_level: "Addiction"
}

function getStats(values) {
  const sorted = [...values].sort((a, b) => a - b)

  const q1 = sorted[Math.floor(sorted.length * 0.25)]
  const median = sorted[Math.floor(sorted.length * 0.5)]
  const q3 = sorted[Math.floor(sorted.length * 0.75)]

  const min = sorted[0]
  const max = sorted[sorted.length - 1]

  return { min, q1, median, q3, max }
}

const BoxShape = (props) => {
  const { cx, yAxis, payload } = props

  if (!payload || !yAxis) return null

  const scale = yAxis.scale

  const yMin = scale(payload.min)
  const yMax = scale(payload.max)
  const yQ1 = scale(payload.q1)
  const yQ3 = scale(payload.q3)
  const yMedian = scale(payload.median)

  const boxWidth = 20

  return (
    <g>
      {/* linha vertical (whisker) */}
      <line x1={cx} x2={cx} y1={yMin} y2={yMax} stroke="black" />

      {/* caixa */}
      <rect
        x={cx - boxWidth / 2}
        y={yQ3}
        width={boxWidth}
        height={yQ1 - yQ3}
        fill="#8B80F9"
        stroke="black"
      />

      {/* mediana */}
      <line
        x1={cx - boxWidth / 2}
        x2={cx + boxWidth / 2}
        y1={yMedian}
        y2={yMedian}
        stroke="black"
        strokeWidth={2}
      />
    </g>
  )
}

function BoxplotGrid() {
  const [points, setPoints] = useState([])
  const [boxData, setBoxData] = useState([])

  useEffect(() => {
    fetch("/Teen_Mental_Health_Dataset.csv")
      .then((res) => res.text())
      .then((csvText) => {
        const rows = csvText.trim().split("\n")
        const headers = rows[0].split(",")

        const parsed = rows.slice(1).map((row) => {
          const values = row.split(",")

          return headers.reduce((acc, header, index) => {
            const val = parseFloat(values[index])
            acc[header] = isNaN(val) ? null : val
            return acc
          }, {})
        })

        const scatter = []
        const boxArr = []

        columns.forEach((col, i) => {
          const values = parsed
            .map((r) => r[col])
            .filter((v) => v !== null)

          const s = getStats(values)

          boxArr.push({
            x: i,
            ...s
          })

          values.forEach((v) => {
            scatter.push({ x: i, y: v })
          })
        })

        setPoints(scatter)
        setBoxData(boxArr)
      })
  }, [])

  return (
    <div className="basic-card" style={{ height: "600px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
          <CartesianGrid />

          <XAxis
            type="number"
            dataKey="x"
            domain={[-1, columns.length]}
            tickFormatter={(i) => labelMap[columns[i]]}
          />

          <YAxis type="number" dataKey="y" />

          <Tooltip />

          {/* pontos */}
          <Scatter data={points} fill="#8B80F9" />

          {/* 🔥 BOXPLOT REAL */}
          <Scatter
            data={boxData}
            shape={(props) => <BoxShape {...props} />}
            fill="transparent"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BoxplotGrid