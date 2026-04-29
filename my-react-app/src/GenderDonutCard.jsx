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
      text: "Gender Distribution",
      font: {
        size: 20
      }
    },
    legend: {
      position: "bottom"
    }
  }
}

function parseCsv(csvText) {
  const rows = csvText.trim().split("\n")
  const headers = rows[0].split(",")

  return rows.slice(1).map((row) => {
    const values = row.split(",")

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

function GenderDonutCard() {
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    fetch("/Teen_Mental_Health_Dataset.csv")
      .then((response) => response.text())
      .then((csvText) => {
        const data = parseCsv(csvText)
        const counts = countByColumn(data, "gender")
        const labels = Object.keys(counts)
        const colors = ["#0C1B33", "#F05365"]

        setChartData({
          labels,
          datasets: [
            {
              label: "Students",
              data: Object.values(counts),
              backgroundColor: labels.map((_, index) => colors[index % colors.length]),
              borderColor: "#000000",
              borderWidth: 0.8
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

export default GenderDonutCard
