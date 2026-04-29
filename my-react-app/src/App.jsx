import Header from "./Header.jsx"
import AgeBarCard from "./charts/bar/AgeBarCard.jsx"
import StressBarCard from "./charts/bar/StressBarCard.jsx"
import AnxietyBarCard from "./charts/bar/AnxietyBarCard.jsx"
import AddictionBarCard from "./charts/bar/AddictionBarCard.jsx"
import DailySocialBarCard from "./charts/histograms/DailySocialBarCard.jsx"
import GenderDonutCard from "./charts/donut/GenderDonutCard.jsx"
import PlatformUsageDonutCard from "./charts/donut/PlatformUsageDonutCard.jsx"
import SocialInteractionDonutCard from "./charts/donut/SocialInteractionDonutCard.jsx"
import DepressionLabelDonutCard from "./charts/donut/DepressionLabelDonutCard.jsx"
import SleepHoursHistogramCard from "./charts/histograms/SleepHoursHistogramCard.jsx"
import ScreenTimeBeforeSleepHistogramCard from "./charts/histograms/ScreenTimeBeforeSleepHistogramCard.jsx"
import AcademicPerformanceHistogramCard from "./charts/histograms/AcademicPerformanceHistogramCard.jsx"
import PhysicalActivityHistogramCard from "./charts/histograms/PhysicalActivityHistogramCard.jsx"
import ContentDivider from "./ContentDivider.jsx"
import SectionDivider from "./SectionDivider.jsx"
import CorrelationHeatmap from "./charts/heat_map/CorrelationHeatmap.jsx"

function App() {
return (
    <>
      <Header />

      <main>
        <section id="understanding-data">
          <h2 className="section-title">Understanding the Data</h2>
          <p className="section-paragraph">
            This project explores a teen mental health dataset focused on social media habits, lifestyle patterns, and self-reported mental health indicators. The goal is to understand how usage behavior, sleep, activity, and demographic factors appear across the student sample.
          </p>

          <h3 className="content-title">Discrete numeric indicators</h3>
          <p className="section-paragraph">
            These charts summarize numeric values recorded per student, such as age and mental health scores. They help reveal the distribution of students across age groups and reported stress, anxiety, and addiction levels.
          </p>
          <div className="charts-grid">
            <AgeBarCard/>
            <StressBarCard/>
            <AnxietyBarCard/>
            <AddictionBarCard/>
          </div>
            <ContentDivider/>

          <h3 className="content-title">Nominal categories</h3>
          <p className="section-paragraph">
            These donut charts describe categorical attributes in the dataset. They show how students are distributed by gender, preferred platform, social interaction level, and depression label.
          </p>
          <div className="charts-grid">
            <GenderDonutCard/>
            <PlatformUsageDonutCard/>
            <SocialInteractionDonutCard/>
            <DepressionLabelDonutCard/>
          </div>
            <ContentDivider/>

          <h3 className="content-title">Continuous numeric indicators</h3>
          <p className="section-paragraph">
            These histograms analyze non-discrete numeric values. They show how sleep, screen time before sleep, daily social media use, academic performance, and physical activity are spread across the dataset.
          </p>
          <div className="charts-grid">
            <SleepHoursHistogramCard/>
            <DailySocialBarCard/>
            <ScreenTimeBeforeSleepHistogramCard/>
            <AcademicPerformanceHistogramCard/>
            <PhysicalActivityHistogramCard/>
          </div>
        </section>
          <SectionDivider/>

        <section id="correlations">
          <h2 className="section-title">Correlations & Outliers</h2>

          <p className="section-paragraph">
            This heatmap shows how numeric variables relate to each other.
            Green indicates positive correlation, while red indicates negative correlation.
          </p>

          <div className="charts-grid">
            <CorrelationHeatmap />
          </div>
        </section>

        <section id="clustering">
          <h2 className="section-title">K-Means Clustering</h2>
        </section>

        <section id="conclusions">
          <h2 className="section-title">Conclusions</h2>
        </section>
      </main>

    </>
  )

}

export default App
