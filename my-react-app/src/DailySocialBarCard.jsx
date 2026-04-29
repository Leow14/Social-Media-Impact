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
    legend: {
      display: false
    },
    title: {
      display: true,
      text: "Daily Social Media Hours",
      font: {
        size: 20
      }
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
      title: {
        display: true,
        text: "Hours per day"
      },
      ticks: {
        font: {
          size: 14
        }
      }
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Frequency"
      },
      ticks: {
        precision: 0,
        font: {
          size: 14
        }
      }
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

function createHourBins(data) {
  const bins = {
    "1-2": 0,
    "2-3": 0,
    "3-4": 0,
    "4-5": 0,
    "5-6": 0,
    "6-7": 0,
    "7-8": 0,
    "8+": 0
  }

  data.forEach((row) => {
    const hours = Number(row.daily_social_media_hours)

    if (hours >= 1 && hours < 2) bins["1-2"] += 1
    else if (hours >= 2 && hours < 3) bins["2-3"] += 1
    else if (hours >= 3 && hours < 4) bins["3-4"] += 1
    else if (hours >= 4 && hours < 5) bins["4-5"] += 1
    else if (hours >= 5 && hours < 6) bins["5-6"] += 1
    else if (hours >= 6 && hours < 7) bins["6-7"] += 1
    else if (hours >= 7 && hours < 8) bins["7-8"] += 1
    else if (hours >= 8) bins["8+"] += 1
  })

  return bins
}

function DailySocialBarCard() {
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    fetch("/Teen_Mental_Health_Dataset.csv")
      .then((response) => response.text())
      .then((csvText) => {
        const data = parseCsv(csvText)
        const bins = createHourBins(data)

        setChartData({
          labels: Object.keys(bins),
          datasets: [
            {
              label: "Frequency",
              data: Object.values(bins),
              backgroundColor: "#277DA1",
              categoryPercentage: 1,
              barPercentage: 1,
              borderColor: "#000000",
              borderWidth: 1.5
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

export default DailySocialBarCard
