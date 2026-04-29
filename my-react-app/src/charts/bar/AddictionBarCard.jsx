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
      text: "Students by addiction level",
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


function AddictionBarCard() {
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
          const addiction_level = row.addiction_level
          ageCounts[addiction_level] = (ageCounts[addiction_level] || 0) + 1
        })

        setChartData({
          labels: Object.keys(ageCounts),
          datasets: [
            {
              label: "Students by addiction level",
              data: Object.values(ageCounts),
              backgroundColor: "#90BE6D"
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
export default AddictionBarCard
