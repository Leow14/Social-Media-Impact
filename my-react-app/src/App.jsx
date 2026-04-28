import Header from "./Header.jsx"
import AgeBarCard from "./AgeBarCard.jsx"
import StressBarCard from "./StressBarCard.jsx"

function App() {
return (
    <>
      <Header />

      <main>
        <section id="understanding-data">
          <h2>Understanding the Data</h2>
          <AgeBarCard />
          <StressBarCard/>
        </section>

        <section id="correlations">
          <h2>Correlations & Outliers</h2>
        </section>

        <section id="clustering">
          <h2>K-Means Clustering</h2>
        </section>

        <section id="conclusions">
          <h2>Conclusions</h2>
        </section>
      </main>

    </>
  )

}

export default App
