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


const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Students by stress level",
      font: {
        size: 30
      }
    },
    legend: {
      display: false
    },
    tooltip: {
      titleFont: {
        size: 16
      },
      bodyFont: {
        size: 14
      }
    }
  },
  scales: {
    x: {
      ticks: {
        font: {
          size: 20
        }
      }
    },
    y: {
      ticks: {
        font: {
          size: 20
        }
      }
    }
  }
}


function StressBarCard() {
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
          const stress_level = row.stress_level
          ageCounts[stress_level] = (ageCounts[stress_level] || 0) + 1
        })

        setChartData({
          labels: Object.keys(ageCounts),
          datasets: [
            {
              label: "Students by stress level",
              data: Object.values(ageCounts),
              backgroundColor: "#F3722C"
            }
          ]
        })
      })
  }, [])

     return (
    <div className="basic-card">
      {chartData && <Bar data={chartData} options={chartOptions} />}
    </div>
  )
}
export default StressBarCard
