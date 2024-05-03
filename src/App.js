import React, { useState } from 'react';
import './style.css';

function App() {
  const [height, setHeight] = useState('');
  const [rentedFor, setRentedFor] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');

  const rentedForOptions = [
    { value: '1', label: 'Date' },
    { value: '2', label: 'Everyday' },
    { value: '3', label: 'Formal Affair' },
    { value: '4', label: 'Party' },
    { value: '5', label: 'Vacation' },
    { value: '6', label: 'Wedding' },
  ];

  const classifyFashion = (category) => {
    switch (category) {
      case 1:
        return 'Ball Gown';
      case 2:
        return 'Blazer';
      case 3:
        return 'Blouse';
      case 4:
        return 'Blouson';
      case 5:
        return 'Bomber';
      case 6:
        return 'Caftan';
      case 7:
        return 'Cami';
      case 8:
        return 'Cape';
      case 9:
        return 'Cardigan';
      case 10:
        return 'Coat';
      case 11:
        return 'Crewneck';
      case 12:
        return 'Culotte';
      case 13:
        return 'Down';
      case 14:
        return 'Dress';
      case 15:
        return 'Duster';
      case 16:
        return 'Frock';
      case 17:
        return 'Gown';
      case 18:
        return 'Henley';
      case 19:
        return 'Hoodie';
      case 20:
        return 'Jacket';
      case 21:
        return 'Jogger';
      case 22:
        return 'Jumpsuit';
      case 23:
        return 'Kimono';
      case 24:
        return 'Knit';
      case 25:
        return 'Legging';
      case 26:
        return 'Maxi';
      case 27:
        return 'Midi';
      case 28:
        return 'Mini';
      case 29:
        return 'Overalls';
      case 30:
        return 'Overcoat';
      case 31:
        return 'Pants';
      case 32:
        return 'Parka';
      case 33:
        return 'Peacoat';
      case 34:
        return 'Poncho';
      case 35:
        return 'Print';
      case 36:
        return 'Pullover';
      case 37:
        return 'Romper';
      case 38:
        return 'Sheath';
      case 39:
        return 'Shift';
      case 40:
        return 'Shirt';
      case 41:
        return 'Shirtdress';
      case 42:
        return 'Skirt';
      case 43:
        return 'Suit';
      case 44:
        return 'Sweater';
      case 45:
        return 'Sweatshirt';
      case 46:
        return 'Sweatpants';
      case 47:
        return 'Sweatshirt';
      case 48:
        return 'Tank';
      case 49:
        return 'Tee';
      case 50:
        return 'Tight';
      case 51:
        return 'Top';
      case 52:
        return 'Trench';
      case 53:
        return 'Trousers';
      case 54:
        return 'T-shirt';
      case 55:
        return 'Tunic';
      case 56:
        return 'Turtleneck';
      case 57:
        return 'Vest';
      default:
        return '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ height, rented_for: rentedFor, age, weight }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to get recommendation');
        }
        return response.json();
      })
      .then((data) => {
        const fashionCategory = data.prediction[0];
        setPrediction(classifyFashion(fashionCategory));
        setError('');
      })
      .catch((error) => {
        setPrediction('');
        setError('Failed to get recommendation');
      });
  };

  return (
    <div className="container">
      <h1>Fashion Recommendation</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <select
          value={rentedFor}
          onChange={(e) => setRentedFor(e.target.value)}
        >
          <option value="">Select Rented For</option>
          {rentedForOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <button type="submit">Get Recommendation</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {prediction && <p>Recommended Fashion: {prediction}</p>}
    </div>
  );
}

export default App;
