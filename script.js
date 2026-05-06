const algorithms = [
    {
        name: "Experiment-1: Iris Data Exploration",
        question: "Load a sample dataset (Iris) and explore data properties using Pandas and Matplotlib.",
        explanation: "Is experiment mein hum Iris dataset load karte hain aur Pandas/Matplotlib use karke data ki details (like mean, count, scatter plots) check karte hain taaki humein flowers ki properties samajh aayein. Viva ke liye yaad rakhein: head() rows dikhata hai, describe() stats deta hai.",
        category: "Machine Learning",
        code: `import pandas as pd
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris

# 1. Load the Iris dataset (Bunch object)
iris_bunch = load_iris(as_frame=True)
df = iris_bunch.frame

# 2. Exploratory Data Analysis (EDA)
print("--- First 5 Rows ---")
print(df.head())

print("\\n--- Dataset Info ---")
print(df.info())

print("\\n--- Summary Statistics ---")
print(df.describe())

# 3. Visualization
plt.figure(figsize=(10, 6))
scatter = plt.scatter(df['sepal length (cm)'], df['sepal width (cm)'], 
            c=df['target'], cmap='viridis', edgecolor='k')
plt.title('Iris Sepal Dimensions')
plt.xlabel('Sepal Length (cm)')
plt.ylabel('Sepal Width (cm)')
plt.legend(handles=scatter.legend_elements()[0], labels=iris_bunch.target_names)
plt.grid(True, alpha=0.3)
plt.show()`
    },
    {
        name: "Experiment-2: Classification vs Clustering",
        question: "Implement a simple classification (Decision Tree) and a clustering (K-Means) on a dataset and compare the outputs.",
        explanation: "Classification supervised hota hai jisme labels (answers) hote hain, aur Clustering unsupervised hota hai jisme model khud similarities dhundta hai. Hum Iris flowers ko predict bhi karenge aur unka group bhi banayenge comparison ke liye.",
        category: "Machine Learning",
        code: `import pandas as pd
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier
from sklearn.cluster import KMeans
from sklearn.metrics import accuracy_score
import numpy as np

# 1. Load Data
iris = load_iris(as_frame=True)
X = iris.data[['petal length (cm)', 'petal width (cm)']]
y = iris.target

# 2. Classification: Decision Tree (Supervised)
dt_model = DecisionTreeClassifier(max_depth=3, random_state=42)
dt_model.fit(X, y)
dt_predictions = dt_model.predict(X)

# 3. Clustering: K-Means (Unsupervised)
kmeans_model = KMeans(n_clusters=3, random_state=42, n_init=10)
kmeans_model.fit(X)
kmeans_clusters = kmeans_model.labels_

# 4. Visualization
fig, axes = plt.subplots(1, 3, figsize=(18, 5))
axes[0].scatter(X.iloc[:, 0], X.iloc[:, 1], c=y, cmap='viridis', edgecolor='k')
axes[0].set_title('Ground Truth')
axes[1].scatter(X.iloc[:, 0], X.iloc[:, 1], c=dt_predictions, cmap='viridis', edgecolor='k')
axes[1].set_title(f'Decision Tree (Acc: {accuracy_score(y, dt_predictions):.2f})')
axes[2].scatter(X.iloc[:, 0], X.iloc[:, 1], c=kmeans_clusters, cmap='plasma', edgecolor='k')
axes[2].set_title('K-Means Clusters')
plt.tight_layout()
plt.show()`
    },
    {
        name: "Experiment-3: House Price Prediction",
        question: "Predict house prices using the Housing Dataset and evaluate performance using RMSE and R2 scores.",
        explanation: "Hum California housing data use karke gharon ki prices predict karenge. Isme Random Forest Regressor use kiya gaya hai jo bohot saare decision trees ko combine karke errors kam karta hai. R2 score humein batata hai ki prediction kitni accurate hai.",
        category: "Machine Learning",
        code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score

# 1. Load Dataset
housing = fetch_california_housing(as_frame=True)
X, y = housing.data, housing.target 

# 2. Split (80/20)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 4. Evaluate
y_pred = model.predict(X_test)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)
print(f"RMSE: {rmse:.4f}, R2 Score: {r2:.4f}")

plt.scatter(y_test, y_pred, alpha=0.3)
plt.plot([y.min(), y.max()], [y.min(), y.max()], 'r--')
plt.show()`
    },
    {
        name: "Experiment-4: Feature Selection & Cross-Val",
        question: "Perform feature selection using correlation analysis and validate the model using cross-validation.",
        explanation: "Bohot saare features model ko confuse kar sakte hain, isliye hum sirf zaruri features rakhte hain correlation check karke. Cross-validation (CV) humein batata hai ki model alag-alag data samples par consistently kaisa perform karega.",
        category: "Machine Learning",
        code: `import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

# 1. Load Data
cancer = load_breast_cancer(as_frame=True)
X, y = cancer.data, cancer.target

# 2. Correlation Analysis
corr_matrix = X.corr().abs()
upper_tri = corr_matrix.where(np.triu(np.ones(corr_matrix.shape), k=1).astype(bool))
to_drop = [col for col in upper_tri.columns if any(upper_tri[col] > 0.90)]
X_selected = X.drop(columns=to_drop)

# 3. Cross-Validation
model = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))
scores = cross_val_score(model, X_selected, y, cv=5)
print(f"CV Accuracy: {scores.mean():.4f}")`
    },
    {
        name: "Experiment-5: K-NN vs Decision Trees",
        question: "Implement K-NN and Decision Trees and analyze their performance on non-linear data.",
        explanation: "K-NN 'proximity' (doori) par kaam karta hai aur Decision Tree 'splitting rules' par. Hum moons dataset use karke dekh rahe hain ki non-linear (tedhe-medhe) patterns ko kaunsa model better handle karta hai. Boundaries visualize karna Viva mein helpful hota hai.",
        category: "Machine Learning",
        code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

X, y = make_moons(n_samples=500, noise=0.25, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

knn = KNeighborsClassifier(n_neighbors=5)
dtree = DecisionTreeClassifier(max_depth=5)

knn.fit(X_train, y_train)
dtree.fit(X_train, y_train)

print(f"KNN: {accuracy_score(y_test, knn.predict(X_test)):.3f}")
print(f"Tree: {accuracy_score(y_test, dtree.predict(X_test)):.3f}")`
    },
    {
        name: "Experiment-6: Ensemble Learning",
        question: "Implement Ensemble Learning techniques like Random Forest and AdaBoost.",
        explanation: "Ensemble matlab 'ek se bhale do'. Random Forest parallel trees use karta hai error kam karne ke liye, aur AdaBoost sequential trees use karta hai mistakes ko correct karne ke liye. Dono techniques normal Decision Tree se better results deti hain.",
        category: "Machine Learning",
        code: `from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier
from sklearn.metrics import accuracy_score

wine = load_wine()
X_train, X_test, y_train, y_test = train_test_split(wine.data, wine.target, test_size=0.3)

rf = RandomForestClassifier(n_estimators=100)
ada = AdaBoostClassifier(n_estimators=50, algorithm='SAMME')

rf.fit(X_train, y_train)
ada.fit(X_train, y_train)

print(f"RF Acc: {accuracy_score(y_test, rf.predict(X_test)):.4f}")
print(f"Ada Acc: {accuracy_score(y_test, ada.predict(X_test)):.4f}")`
    },
    {
        name: "Experiment-7: K-Means & PCA",
        question: "Cluster customers in a shopping dataset and visualize clusters using PCA.",
        explanation: "Jab data mein bohot saare dimensions (features) hote hain, toh PCA unhe 2-3 important components mein nichod (reduce) deta hai taaki hum screen par clusters dekh sakein. Is experiment mein hum customer segments ko visualize kar rahe hain.",
        category: "Machine Learning",
        code: `import pandas as pd
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import make_blobs

X, _ = make_blobs(n_samples=300, centers=4, n_features=4, random_state=42)
X_scaled = StandardScaler().fit_transform(X)

kmeans = KMeans(n_clusters=4, n_init=10)
labels = kmeans.fit_predict(X_scaled)

pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

plt.scatter(X_pca[:, 0], X_pca[:, 1], c=labels, cmap='Set1')
plt.title("PCA Visualized Clusters")
plt.show()`
    },
    {
        name: "Experiment-8: DBSCAN Clustering",
        question: "Apply DBSCAN to a dataset with noise and visualize results.",
        explanation: "K-Means noise (faltu points) ko handle nahi kar pata, lekin DBSCAN sirf unhi points ko cluster karta hai jo ek doosre ke close hain. Jo points alag reh jaate hain, unhe DBSCAN 'outliers' ya noise ki tarah label (-1) kar deta hai.",
        category: "Machine Learning",
        code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import DBSCAN
from sklearn.datasets import make_moons
from sklearn.preprocessing import StandardScaler

X, _ = make_moons(n_samples=400, noise=0.15, random_state=42)
X_scaled = StandardScaler().fit_transform(X)

db = DBSCAN(eps=0.25, min_samples=6)
labels = db.fit_predict(X_scaled)

plt.scatter(X_scaled[:, 0], X_scaled[:, 1], c=labels, cmap='viridis')
plt.title("DBSCAN (Noise handling)")
plt.show()`
    },
    {
        name: "Experiment-9: Neural Network (MNIST)",
        question: "Implement a simple Feedforward Neural Network using TensorFlow/Keras for digit recognition.",
        explanation: "Ye Deep Learning ki shuruat hai. Hum ek neural network banate hain jo image ke pixels ko analyze karke handwritten numbers (0-9) pehchanta hai. Layers mein 'relu' activation non-linear patterns seekhne ke liye use hoti hai.",
        category: "Machine Learning",
        code: `import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten
from tensorflow.keras.datasets import mnist

(X_train, y_train), (X_test, y_test) = mnist.load_data()
X_train, X_test = X_train / 255.0, X_test / 255.0

model = Sequential([
    Flatten(input_shape=(28, 28)),
    Dense(128, activation='relu'),
    Dense(64, activation='relu'),
    Dense(10, activation='softmax')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=3, batch_size=32)
print(f"Test Accuracy: {model.evaluate(X_test, y_test)[1]:.4f}")`
    },
    {
        name: "Experiment-10: Text Preprocessing",
        question: "Implement basic text preprocessing and feature extraction using Bag-of-Words or TF-IDF.",
        explanation: "Computer english nahi samajhta, toh hum words ko numbers mein convert karte hain. TF-IDF special hai kyunki ye common words (the, is) ko kam weight deta hai aur unique words ko zyada importance deta hai taaki model text ka matlab samajh sake.",
        category: "Machine Learning",
        code: `import pandas as pd
import re
from sklearn.feature_extraction.text import TfidfVectorizer

corpus = ["Machine Learning is great.", "Deep Learning is complex.", "AI is the future."]

def clean(text):
    return re.sub(r'[^\\w\\s]', '', text.lower())

cleaned = [clean(doc) for doc in corpus]
tfidf = TfidfVectorizer(stop_words='english')
matrix = tfidf.fit_transform(cleaned)
df = pd.DataFrame(matrix.toarray(), columns=tfidf.get_feature_names_out())
print(df.round(3))`
    }
];

// Helper function to copy code to clipboard
function copyCode(btn, text) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.innerText;
        btn.innerText = "Copied!";
        btn.classList.add('copied');
        setTimeout(() => {
            btn.innerText = originalText;
            btn.classList.remove('copied');
        }, 2000);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor-follower');
    const searchTrigger = document.getElementById('search-trigger');
    const searchPanel = document.getElementById('search-panel');
    const closeSearch = document.getElementById('close-search');
    const algoSearchInput = document.getElementById('algo-search-input');
    const algoResults = document.getElementById('algo-results');

    // Cursor Follower
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    });

    // Toggle Search Panel
    searchTrigger.addEventListener('click', () => {
        searchPanel.classList.add('active');
        algoSearchInput.focus();
        renderAlgorithms();
    });

    closeSearch.addEventListener('click', () => {
        searchPanel.classList.remove('active');
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') searchPanel.classList.remove('active');
    });

    // Search Filtering
    algoSearchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        renderAlgorithms(term);
    });

    function renderAlgorithms(filter = '') {
        algoResults.innerHTML = '';
        const filtered = algorithms.filter(a => 
            a.name.toLowerCase().includes(filter) || 
            a.category.toLowerCase().includes(filter) ||
            a.explanation.toLowerCase().includes(filter)
        );

        filtered.forEach(algo => {
            const card = document.createElement('div');
            card.className = 'algo-card';
            card.innerHTML = `
                <div class="algo-card-header">
                    <h3>${algo.name}</h3>
                    <button class="copy-btn" onclick="copyCode(this, \`${algo.code.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`)">Copy Code</button>
                </div>
                <div class="algo-meta">
                    <p class="question-text"><strong>Q:</strong> ${algo.question}</p>
                    <p class="explanation-text"><strong>Short Note:</strong> ${algo.explanation}</p>
                </div>
                <pre class="code-block"><code>${algo.code}</code></pre>
            `;
            algoResults.appendChild(card);
        });

        if (filtered.length === 0) {
            algoResults.innerHTML = '<p style="text-align:center; color: #666;">No experiments found matching your search.</p>';
        }
    }

    // Initialize with all
    renderAlgorithms();
});
