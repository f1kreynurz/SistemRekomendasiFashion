import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Membaca dataset
df = pd.read_excel("dataset_final.xlsx")

# Memilih fitur dan target
x = df[["height", "rented for", "age", "weight"]]
y = df["category"]

# Pembagian data menjadi data latih dan data uji
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=10)

# Membuat model Random Forest
rf_model = RandomForestClassifier(random_state=10)

# Penyetelan hyperparameter menggunakan Grid Search dengan jumlah lipatan validasi yang lebih sedikit
param_grid = {
    'n_estimators': [100, 200],
    'max_depth': [None, 10],
    'min_samples_split': [2, 5],
    'min_samples_leaf': [1, 2]
}

grid_search = GridSearchCV(estimator=rf_model, param_grid=param_grid, cv=3, scoring='accuracy', n_jobs=-1)
grid_search.fit(x_train, y_train)

# Model terbaik setelah penyetelan hyperparameter
best_rf_model = grid_search.best_estimator_

# Melakukan prediksi
y_pred = best_rf_model.predict(x_test)

# Evaluasi model
accuracy = accuracy_score(y_test, y_pred)
print("Akurasi model: {:.2f}%".format(accuracy * 100))

# Classification Report
print("Classification Report:")
print(classification_report(y_test, y_pred, zero_division=1))

# Fungsi untuk membuat rekomendasi fashion
def predict_fashion(height, rented_for, age, weight):
    input_data = [[height, rented_for, age, weight]]
    prediction = best_rf_model.predict(input_data)
    return prediction[0]

# Contoh penggunaan
user_height = float(input("Masukkan tinggi badan Anda (cm): "))
user_rented_for = int(input("Masukkan jenis acara (1: date, 2: everyday, 3: formal affair, 4: party, 5: vacation, 6: wedding): "))
user_age = int(input("Masukkan usia Anda: "))
user_weight = float(input("Masukkan berat badan Anda (kg): "))

fashion_prediction = predict_fashion(user_height, user_rented_for, user_age, user_weight)
print("Rekomendasi fashion untuk Anda: {}".format(fashion_prediction))
