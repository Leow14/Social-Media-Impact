#Import libraries and frameworks
import pandas as pd

from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler

#Load the dataset
df = pd.read_csv("Teen_Mental_Health_Dataset.csv")

#Inspect the dataset
#    Show shape
print(df.shape)
#    Show column names
print(df.columns.to_list())
#    Check data types
print(df.dtypes)
#    Check missing values
print(df.isna().sum())

#Choose the features for clustering
#    Keep only numeric columns
#    Remove variables that are not useful for clustering
#    Decide whether to include depression_label or not

#Prepare the data
#    Create feature matrix
#    Handle missing values if needed
#    Scale the features

#Decide the number of clusters
#    Test multiple k values
#    Use elbow method
#    Use silhouette score

#Train the K-means model
#    Fit K-means using the chosen k

#Assign cluster labels
#    Add cluster result to the dataframe

#Analyze the clusters
#    Group by cluster
#    Calculate mean of each feature inside each cluster
#    Compare cluster profiles

#Visualize the clusters
#    Reduce dimensions with PCA if needed
#    Plot the clusters in 2D
#    Color points by cluster

#Interpret the clusters
#    Describe each cluster in plain language
#    Example: heavy users with low sleep and high addiction
#    Example: balanced users with lower risk indicators

#Write conclusions
#    Explain what kinds of teen profiles were found
#    Connect cluster patterns to the project question
#    Mention limitations of unsupervised learning