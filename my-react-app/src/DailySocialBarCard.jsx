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

function DailySocialBarCard() {
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
          const daily_social_media_hours = row.daily_social_media_hours
          ageCounts[daily_social_media_hours] = (ageCounts[daily_social_media_hours] || 0) + 1
        })

        setChartData({
          labels: Object.keys(ageCounts),
          datasets: [
            {
              label: "Students by Daily Social Media Hours Spent",
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
export default DailySocialBarCard