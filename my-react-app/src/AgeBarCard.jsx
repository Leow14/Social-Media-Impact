import { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function AgeBarCard() {
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    fetch("/Teen_Mental_Health_Dataset.csv")
      .then((response) => response.text())
      .then((csvText) => {
        const rows = csvText.trim().split("\n")
        const headers = rows[0].split(",")

        const data = rows.slice(1).map((row) => {
          const values = row.split(",")

          return headers.reduce((obj, header, index) => {
            obj[header] = values[index]
            return obj
          }, {})
        })

        const ageCounts = {}

        data.forEach((row) => {
          const age = row.age
          ageCounts[age] = (ageCounts[age] || 0) + 1
        })

        setChartData({
          labels: Object.keys(ageCounts),
          datasets: [
            {
              label: "Students by age",
              data: Object.values(ageCounts),
              backgroundColor: "#277DA1"
            }
          ]
        })
      })
  }, [])

     return (
    <div className="basic-card">
      {chartData && <Bar data={chartData} />}
    </div>
  )
}
export default AgeBarCard