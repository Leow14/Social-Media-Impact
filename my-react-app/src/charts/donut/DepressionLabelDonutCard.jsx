import { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Title, Tooltip, Legend)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "55%",
  plugins: {
    title: {
      display: true,
      text: "Percentage of Depressed Students",
      font: {
        size: 20
      }
    },
    legend: {
      position: "bottom",
      labels: {
        font: {
          size: 25
        }
      }
    }
  }
}

function parseCsv(csvText) {
  const rows = csvText.trim().split("\n")
  const headers = rows[0].split(",").map((header) => header.trim())

  return rows.slice(1).map((row) => {
    const values = row.split(",").map((value) => value.trim())

    return headers.reduce((obj, header, index) => {
      obj[header] = values[index]
      return obj
    }, {})
  })
}

function countByColumn(data, columnName) {
  return data.reduce((counts, row) => {
    const value = row[columnName]
    counts[value] = (counts[value] || 0) + 1
    return counts
  }, {})
}

function DepressionLabelDonutCard() {
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    fetch("/Teen_Mental_Health_Dataset.csv")
      .then((response) => response.text())
      .then((csvText) => {
        const data = parseCsv(csvText)
        const counts = countByColumn(data, "depression_label")
        const depressedCount = counts["1"] || 0
        const notDepressedCount = counts["0"] || 0
        const total = depressedCount + notDepressedCount
        const notDepressedPercentage = ((notDepressedCount / total) * 100).toFixed(1)
        const depressedPercentage = ((depressedCount / total) * 100).toFixed(1)
        const labels = [
          `Not depressed `,
          `Depressed `
        ]

        setChartData({
          labels,
          datasets: [
            {
              label: "Students",
              data: [notDepressedCount, depressedCount],
              backgroundColor: ["#F3722C", "#577590"]
            }
          ]
        })
      })
  }, [])

  return (
    <div className="basic-card">
      {chartData && <Doughnut data={chartData} options={chartOptions} />}
    </div>
  )
}

export default DepressionLabelDonutCard
