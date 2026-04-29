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
import BoxplotGrid from "./charts/boxplot/BoxplotGrid.jsx"
import OutlierVisualization from "./charts/boxplot/OutlierVisualization.jsx";

function App() {
return (
    <>
      <Header />

      <main>
        <section>
          <h2 className="section-title">What is this project about</h2>
          <p className="section-paragraph">
            This project explores a dataset on teen mental health, originally published on Kaggle by Muhammad Shahzad. 
            The data investigates how social media use affects the mental health of teenagers, including daily habits such as time spent on social media, 
            sleep patterns, stress levels, anxiety, and physical activity. <br/>
            The main objective is to understand whether high social media use and addiction are linked to mental health issues like stress, anxiety, 
            and depression. The dataset is useful for behavioral analysis and for building machine learning models aimed at early detection of mental 
            health risks in teenagers. <br/>
            Source:<a href="https://www.kaggle.com/datasets/algozee/teenager-menthal-healy" target="_blank"> Kaggle - Teen Mental Health Dataset </a>
          </p>
        </section>
        <section id="understanding-data">
          <h2 className="section-title">Understanding the Data</h2>
          <p className="section-paragraph">
            
          </p>

          <h3 className="content-title">Discrete numeric indicators</h3>
          <p className="section-paragraph">
            These charts summarize numeric values recorded per student, such as age and mental health scores. 
            They help reveal the distribution of students across age groups and reported stress, anxiety, and addiction levels. 
            Understanding this data is important because it highlights how many students fall into higher-risk categories 
            (e.g., high stress or high addiction), allowing us to investigate possible links between social media use and mental 
            health issues across different age groups.
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
            With all that info in mind, we now have to check correlations within the numerical columns. <br/>
            This heatmap shows how numeric variables relate to each other. <br/>
            Green indicates positive correlation, while red indicates negative correlation. 
            By identifying which variables move together, for instance, whether higher social media addiction correlates 
            with higher stress or anxiety, we can better understand the underlying patterns in teen mental health. 
            Additionally, detecting outliers will help us spot extreme cases or possible data errors that could distort our analysis.
          </p>
          <div className="charts-grid">
            <CorrelationHeatmap />
          </div>
          <p className="section-paragraph">
            Now the objective is to seek out outliers inside the data frame. <br/>
            Outliers are data points that differ significantly from the majority of the data in a dataset. 
            They can arise due to variability in the data, measurement errors, or unusual events. 
            Outliers may distort statistical analyses and machine learning models, so it is important to detect and handle them appropriately. <br/>
            However, as we can see, there are no outliers inside any of the numerical columns.
          </p>
          <div className="charts-grid">
            <OutlierVisualization />
          </div>
        </section>

        <section id="clustering">
          <h2 className="section-title">K-Means Clustering</h2>
          <h3 className="content-title">Cluster Interpretation</h3>
              <p className="section-paragraph">
                The clustering analysis suggests five different student profiles based on social media use, 
                sleep, stress, anxiety, addiction level, academic performance, physical activity, and social interaction. 
                These profiles should be interpreted as exploratory patterns, not as definitive categories. 
                Since the silhouette score was relatively low/moderate, there is some overlap between clusters, 
                meaning that the groups are useful for interpretation but not perfectly separated.</p>
              <h4 className="cluster-title">Cluster 0: Younger Stressed Low-Interaction Users</h4>
              <p className="section-paragraph">
                This cluster is mostly composed of younger students, with an average age of 14. 
                They show relatively high daily social media use, lower sleep duration, the lowest physical activity level, 
                and one of the lowest social interaction levels. <br/>
                The most important point in this group is the high stress level. Even though their anxiety and addiction levels 
                are not the highest among all clusters, they still show a potentially concerning pattern: high online time, 
                low physical activity, low social interaction, and reduced sleep. <br/>
                This profile may represent younger students who spend a considerable amount of time online but do not compensate 
                it with enough offline social interaction, physical activity, or rest. A possible point of attention is that stress 
                may be associated with a combination of poor sleep habits, low exercise, and limited social interaction.</p>
              <h4 className="cluster-title">Cluster 1: Balanced Low-Risk Users</h4>
              <p className="section-paragraph">
                This cluster appears to be the most balanced and lowest-risk profile. Students in this 
                group have the lowest daily social media use, the highest sleep duration, the highest academic performance, the highest physical activity, 
                the lowest anxiety level, the lowest addiction level, and the highest social interaction level. <br/>
                This suggests a healthier behavioral pattern. These students seem to have better balance between online activity, offline interaction, rest, 
                exercise, and school performance. <br/>
                A possible interpretation is that this group represents students who use social media in a more controlled way and maintain protective habits,
                 such as sleeping more, exercising more, interacting socially, and performing better academically.</p>
              <h4 className="cluster-title">Cluster 2: Older Isolated but Stable Users</h4>
              <p className="section-paragraph">
                This cluster has the highest average age, around 17.5 years. Students in this group show relatively low daily social media use, good sleep duration, 
                good physical activity, low stress, and average academic performance. However, the most distinctive characteristic is the extremely low social interaction level. <br/>
                This creates an interesting profile: these students do not show the worst mental health indicators, 
                but they appear socially isolated compared to the other groups. Their anxiety and addiction levels are moderate, while stress is low. <br/>
                A possible interpretation is that these students may have more stable routines and healthier habits, but with limited offline social interaction. 
                This could indicate a more independent or isolated profile. The main point of attention is not necessarily excessive social media use, 
                but the low level of social interaction. <br/>
              </p>
              <h4 className="cluster-title">Cluster 3: High Distress and Academic Risk Users</h4>
              <p className="section-paragraph">
              This is one of the most concerning clusters. Students in this group show the highest stress level, high anxiety, high addiction level, 
              and the lowest academic performance among all clusters. They also have relatively high daily social media use. <br/>
              Unlike Cluster 0, this group does not have extremely low social interaction or physical activity. However, even with some social interaction and exercise,
               the levels of stress, anxiety, and addiction remain high. <br/>
              This profile may represent students who are socially active and physically active, but still experience high emotional pressure and possible academic difficulties. 
              The combination of high stress, high anxiety, high addiction, and lower academic performance makes this cluster a critical group for further investigation. <br/>
              </p>
              <h4 className="cluster-title">Cluster 4: High Anxiety and High Addiction Users</h4>
              <p className="section-paragraph">
              This cluster is also concerning, but for a different reason. Students in this group have the highest anxiety level, 
              the highest addiction level, and the lowest sleep duration. At the same time, they show low stress, normal academic performance, 
              and relatively high social interaction. <br/>
              This suggests that anxiety and stress may not behave in the same way in this dataset. Even though these students report low stress, 
              their anxiety and addiction levels are very high. Their low sleep duration may also be an important risk factor. <br/>
              A possible interpretation is that these students are highly connected and socially interactive, 
              but may have difficulty regulating social media use and anxiety. Their academic performance does not appear to be strongly affected, 
              but the combination of poor sleep, high anxiety, and high addiction should be considered a critical warning sign.
              </p>
        </section>

        <section id="conclusions">
          <h2 className="section-title">Conclusions</h2>          
              <h3 className="content-title">General Conclusion</h3>
              <p className="section-paragraph">Overall, the clusters suggest that students do not follow a single pattern of social media impact. 
              Some groups show high stress, others show high anxiety, and others show low social interaction or healthier routines. 
              This indicates that the relationship between social media use and mental health is complex.<br/>
              The most balanced group was Cluster 1, which combined lower social media use, better sleep, higher physical activity,
              better academic performance, lower anxiety, lower addiction, and stronger social interaction. <br/>
              The most concerning groups were Cluster 3 and Cluster 4. Cluster 3 showed the strongest emotional and academic risk profile, 
              with high stress, high anxiety, high addiction, and lower academic performance. Cluster 4 showed a different risk pattern, 
              with high anxiety, high addiction, and poor sleep, even though stress and academic performance were not as problematic. <br/>
              It is important to note that this analysis does not prove causality. The clusters only show associations between variables. 
              Therefore, the results should be understood as exploratory profiles that can help guide further analysis, 
              rather than as definitive explanations of student behavior.</p>
        </section>
      </main>

    </>
  )

}

export default App
