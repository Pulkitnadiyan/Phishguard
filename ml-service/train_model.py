import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib

from feature_extraction import extract_features

def main():
    print("Loading dataset...")
    try:
        df = pd.read_csv('dataset.csv')
    except Exception as e:
        print(f"Error loading dataset: {e}")
        return

    print("Extracting features from URLs...")
    # Apply feature extraction to every URL in the dataset
    features = df['url'].apply(extract_features).tolist()
    
    # Define labels (0 for safe/legitimate, 1 for phishing)
    label_column = 'status' if 'status' in df.columns else 'label'
    labels = df[label_column].apply(lambda x: 1 if x == 'phishing' else 0).tolist()

    # Split dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)

    print("Training Random Forest Classifier...")
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    print("Evaluating model...")
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"Test Accuracy: {accuracy:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred, target_names=['Safe (0)', 'Phishing (1)']))

    # Save the trained model
    model_filename = 'model.pkl'
    print(f"Saving model to {model_filename}...")
    joblib.dump(model, model_filename)
    print("Training complete!")

if __name__ == '__main__':
    main()
