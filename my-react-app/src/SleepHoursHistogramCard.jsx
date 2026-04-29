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
      text: "Sleep Hours",
      font: {
        size: 20
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0
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

function createHistogramBins(values, binCount) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const binSize = (max - min) / binCount
  const bins = Array.from({ length: binCount }, (_, index) => {
    const start = min + index * binSize
    const end = index === binCount - 1 ? max : start + binSize

    return {
      label: `${start.toFixed(1)}-${end.toFixed(1)}`,
      start,
      end,
      count: 0
    }
  })

  values.forEach((value) => {
    const binIndex = Math.min(Math.floor((value - min) / binSize), binCount - 1)
    bins[binIndex].count += 1
  })

  return bins
}

function SleepHoursHistogramCard() {
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    fetch("/Teen_Mental_Health_Dataset.csv")
      .then((response) => response.text())
      .then((csvText) => {
        const data = parseCsv(csvText)
        const values = data.map((row) => Number(row.sleep_hours))
        const bins = createHistogramBins(values, 10)

        setChartData({
          labels: bins.map((bin) => bin.label),
          datasets: [
            {
              label: "Frequency",
              data: bins.map((bin) => bin.count),
              backgroundColor: "#8B80F9",
              borderColor: "#000000",
              borderWidth: 1.5,
              categoryPercentage: 1,
              barPercentage: 1
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

export default SleepHoursHistogramCard
