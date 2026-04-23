import { useMemo, useState } from "react";

const usageSummary = [
  {
    key: "low",
    label: "Low",
    count: 172,
    anxiety: 5.284884,
    stress: 5.610465,
    depressionRate: 0,
  },
  {
    key: "moderate",
    label: "Moderate",
    count: 356,
    anxiety: 5.735955,
    stress: 5.264045,
    depressionRate: 0,
  },
  {
    key: "high",
    label: "High",
    count: 336,
    anxiety: 5.770833,
    stress: 5.235119,
    depressionRate: 0.026786,
  },
  {
    key: "very_high",
    label: "Very High",
    count: 336,
    anxiety: 5.577381,
    stress: 5.764881,
    depressionRate: 0.065476,
  },
];

const ageCorrelation = [
  {
    key: "13-15",
    socialVsAnxiety: 0.006039,
    socialVsStress: 0.033196,
    socialVsDepression: 0.180846,
  },
  {
    key: "16-18",
    socialVsAnxiety: 0.056201,
    socialVsStress: 0.033979,
    socialVsDepression: 0.138734,
  },
];

const ageNotes = {
  all: {
    title: "Current reading",
    body:
      "Total social media hours do not line up strongly with anxiety or stress in either age group. Depression shows the clearest movement, but it is still weak enough that you should treat it as a lead, not a verdict.",
  },
  "13-15": {
    title: "Ages 13-15",
    body:
      "The youngest group barely shows any hour-to-anxiety relationship. The most notable signal here is the weak positive correlation with depression status.",
  },
  "16-18": {
    title: "Ages 16-18",
    body:
      "The older group is similar: anxiety and stress stay almost flat, while depression remains the only indicator with a modest upward association.",
  },
};

function formatPct(value) {
  return `${(value * 100).toFixed(2)}%`;
}

function formatNumber(value) {
  return Number(value).toFixed(2);
}

function MetricCard({ label, value, support }) {
  return (
    <article className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-support">{support}</div>
    </article>
  );
}

function SegmentControl({ value, options, onChange }) {
  return (
    <div className="segmented" role="tablist" aria-label="Age segment selector">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`segment-button ${value === option.value ? "active" : ""}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function BarPanel({ title, subtitle, rows, valueKey, colorClass, formatter, maxValue }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      <p className="panel-subtitle">{subtitle}</p>
      <div className="bar-list">
        {rows.map((row) => {
          const value = row[valueKey];
          const width = maxValue === 0 ? 0 : (value / maxValue) * 100;

          return (
            <div className="bar-row" key={`${row.key}-${valueKey}`}>
              <div className="bar-header">
                <span>{row.label ?? row.key}</span>
                <strong>{formatter(value)}</strong>
              </div>
              <div className="bar-track">
                <div className={`bar-fill ${colorClass}`} style={{ width: `${width}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MultiMetricPanel({ title, subtitle, rows }) {
  const maxValue = Math.max(...rows.flatMap((row) => [row.anxiety, row.stress]));

  return (
    <section className="panel">
      <h2>{title}</h2>
      <p className="panel-subtitle">{subtitle}</p>
      <div className="comparison-list">
        {rows.map((row) => (
          <div className="comparison-card" key={row.key}>
            <div className="comparison-title">{row.label}</div>
            <div className="mini-stat">
              <span>Anxiety</span>
              <strong>{formatNumber(row.anxiety)}</strong>
            </div>
            <div className="bar-track compact">
              <div
                className="bar-fill accent-blue"
                style={{ width: `${(row.anxiety / maxValue) * 100}%` }}
              />
            </div>
            <div className="mini-stat">
              <span>Stress</span>
              <strong>{formatNumber(row.stress)}</strong>
            </div>
            <div className="bar-track compact">
              <div
                className="bar-fill accent-green"
                style={{ width: `${(row.stress / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CorrelationPanel({ rows }) {
  const maxMagnitude = Math.max(...rows.flatMap((row) => [
    Math.abs(row.socialVsAnxiety),
    Math.abs(row.socialVsStress),
    Math.abs(row.socialVsDepression),
  ]));

  const metrics = [
    { key: "socialVsAnxiety", label: "Anxiety", colorClass: "accent-blue" },
    { key: "socialVsStress", label: "Stress", colorClass: "accent-green" },
    { key: "socialVsDepression", label: "Depression", colorClass: "accent-pink" },
  ];

  return (
    <section className="panel">
      <h2>Correlation By Age Group</h2>
      <p className="panel-subtitle">
        Depression remains the strongest of the three indicators, but still weak overall.
      </p>
      <div className="correlation-grid">
        {rows.map((row) => (
          <div className="comparison-card" key={row.key}>
            <div className="comparison-title">{row.key}</div>
            {metrics.map((metric) => (
              <div key={metric.key}>
                <div className="mini-stat">
                  <span>{metric.label}</span>
                  <strong>{formatNumber(row[metric.key])}</strong>
                </div>
                <div className="bar-track compact">
                  <div
                    className={`bar-fill ${metric.colorClass}`}
                    style={{ width: `${(Math.abs(row[metric.key]) / maxMagnitude) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function InsightPanel({ selectedAge }) {
  const note = ageNotes[selectedAge];
  const findings = [
    "Anxiety averages stay clustered between 5.28 and 5.77 across usage groups.",
    "Stress averages also stay close, which weakens the claim that hours alone explain wellbeing.",
    "Depression cases appear only in the high and very high usage groups.",
  ];

  return (
    <section className="panel">
      <h2>Interpretation</h2>
      <p className="panel-subtitle">Starter narrative for the dashboard.</p>
      <div className="insight-list">
        <div className="insight-item">
          <h3 className="insight-title">{note.title}</h3>
          <p className="insight-body">{note.body}</p>
        </div>
        {findings.map((finding) => (
          <div className="insight-item" key={finding}>
            <p className="insight-body">{finding}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SummaryTable() {
  return (
    <section className="panel">
      <h2>Usage Group Summary</h2>
      <p className="panel-subtitle">These are the current aggregated values from your notebook.</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Usage Group</th>
              <th>Count</th>
              <th>Anxiety Mean</th>
              <th>Stress Mean</th>
              <th>Depression Rate</th>
            </tr>
          </thead>
          <tbody>
            {usageSummary.map((row) => (
              <tr key={row.key}>
                <td>{row.label}</td>
                <td>{row.count}</td>
                <td>{formatNumber(row.anxiety)}</td>
                <td>{formatNumber(row.stress)}</td>
                <td>{formatPct(row.depressionRate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function App() {
  const [selectedAge, setSelectedAge] = useState("all");

  const correlationCards = useMemo(() => {
    if (selectedAge === "all") {
      const anxietyAvg =
        ageCorrelation.reduce((sum, row) => sum + row.socialVsAnxiety, 0) / ageCorrelation.length;
      const stressAvg =
        ageCorrelation.reduce((sum, row) => sum + row.socialVsStress, 0) / ageCorrelation.length;
      const depressionAvg =
        ageCorrelation.reduce((sum, row) => sum + row.socialVsDepression, 0) / ageCorrelation.length;

      return {
        anxiety: anxietyAvg,
        stress: stressAvg,
        depression: depressionAvg,
      };
    }

    return ageCorrelation.find((row) => row.key === selectedAge);
  }, [selectedAge]);

  const depressionPeak = useMemo(
    () =>
      usageSummary.reduce(
        (max, row) => (row.depressionRate > max.depressionRate ? row : max),
        usageSummary[0]
      ),
    []
  );

  const dashboardMetrics = [
    {
      label: "Highest Depression Rate",
      value: formatPct(depressionPeak.depressionRate),
      support: `${depressionPeak.label} users (${depressionPeak.count} teenagers)`,
    },
    {
      label: "Social Hours vs Anxiety",
      value: formatNumber(correlationCards.anxiety),
      support: "Pearson correlation",
    },
    {
      label: "Social Hours vs Stress",
      value: formatNumber(correlationCards.stress),
      support: "Pearson correlation",
    },
    {
      label: "Social Hours vs Depression",
      value: formatNumber(correlationCards.depression),
      support: selectedAge === "all" ? "Average across age groups" : `Age ${selectedAge}`,
    },
  ];

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Teen Social Media Dashboard</span>
          <h1>Exploring whether heavy social media use maps to worse mental health outcomes.</h1>
          <p>
            This first dashboard version is built from your notebook summaries. It already shows the
            main pattern you found: anxiety and stress stay fairly flat, while depression becomes more
            common in the heaviest usage groups.
          </p>
        </div>
        <aside className="hero-note">
          <div className="note-label">Current best lead</div>
          <div className="note-value">Depression rises among heavy users</div>
          <p className="metric-support">
            Use this version to practice React components now, then swap in processed data files after
            the next analysis pass.
          </p>
        </aside>
      </section>

      <section className="metric-grid">
        {dashboardMetrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            support={metric.support}
          />
        ))}
      </section>

      <section className="toolbar">
        <div>
          <strong>Age view</strong>
        </div>
        <SegmentControl
          value={selectedAge}
          onChange={setSelectedAge}
          options={[
            { value: "all", label: "All Ages" },
            { value: "13-15", label: "13-15" },
            { value: "16-18", label: "16-18" },
          ]}
        />
      </section>

      <section className="chart-grid">
        <BarPanel
          title="Depression Rate By Usage Group"
          subtitle="The clearest signal so far is concentrated in high and very high users."
          rows={usageSummary}
          valueKey="depressionRate"
          colorClass="accent-pink"
          formatter={formatPct}
          maxValue={Math.max(...usageSummary.map((row) => row.depressionRate))}
        />
        <MultiMetricPanel
          title="Anxiety And Stress Means"
          subtitle="These two measures stay relatively tight across usage groups."
          rows={usageSummary}
        />
        <CorrelationPanel rows={ageCorrelation} />
        <BarPanel
          title="Sample Distribution"
          subtitle="Counts in each usage group help you judge whether a trend is stable."
          rows={usageSummary}
          valueKey="count"
          colorClass="accent-gold"
          formatter={(value) => `${value}`}
          maxValue={Math.max(...usageSummary.map((row) => row.count))}
        />
      </section>

      <section className="chart-grid section-gap">
        <InsightPanel selectedAge={selectedAge} />
        <SummaryTable />
      </section>

      <p className="footer-note">
        Next upgrade: replace these hard-coded arrays with a processed JSON export from your notebook and add
        filters for platform, sleep behavior, and depression status.
      </p>
    </main>
  );
}
