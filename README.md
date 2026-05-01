# Social Media Impact on Teen Mental Health

## Overview

This project investigates how social media usage affects the mental health of teenagers. It combines **exploratory data analysis** and **unsupervised machine learning** (K‑Means clustering) with an **interactive dashboard** built in React.

- **Data source**: [Social Media Impact on Teen Mental Health](https://www.kaggle.com/datasets/algozee/teenager-menthal-healy) (Kaggle)
- **Goal**: Identify patterns between social media habits, sleep, stress, anxiety, addiction, and other lifestyle factors.

The repository contains two main components:

1. **Python notebook / script** – Data cleaning, transformation, clustering, PCA and export of results as JSON.
2. **React application** – Visual dashboard with charts, outlier detection, cluster visualisation (2D/3D) and user‑friendly navigation.

---

## Technologies

### Frontend (React)
- **React 19** + **Vite** – fast development and build tool
- **Chart.js** + `react-chartjs-2` – bar charts, scatter plots, histograms, line charts (elbow & silhouette)
- **Plotly.js** – interactive 3D cluster visualisation (PCA)
- **CSS3** – custom responsive layout (sidebar, grid cards, mobile support)
- **Bootstrap Icons** – clean icon set

### Data Analysis (Python)
- **Pandas**, **NumPy** – data manipulation
- **Scikit‑learn** – KMeans, PCA, MinMaxScaler, OrdinalEncoder, silhouette score
- **Matplotlib**, **Seaborn** – initial exploration (boxplots, correlation heatmaps, elbow curves)
- **JSON** – bridge to pass processed data to React

---

## Project Structure
