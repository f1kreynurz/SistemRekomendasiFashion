from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

# Memuat model yang sudah dilatih
best_rf_model = joblib.load('SRF_Model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    height = data['height']
    rented_for = data['rented_for']
    age = data['age']
    weight = data['weight']
    
    # Melakukan prediksi menggunakan model yang sudah dilatih
    prediction = best_rf_model.predict([[height, rented_for, age, weight]])
    
    # Mengirimkan hasil prediksi sebagai JSON
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(port=5000, debug=True)