import { useState } from 'react';
import Axios from 'axios';
import closeModalIcon from '../../images/close-modal.svg';

export default function MealForm({ petProfile, setAllMeals, closeForm }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('Wet'); // Options: "Wet", "Dry", "Treat"
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState('00:00');
  const [amount, setAmount] = useState(0);
  const [calorie, setCalorie] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const meal = { petID: petProfile.id, name, date, type, time, calorie: (calorie * amount) / 100 };

    Axios.post('http://localhost:3001/api/meal', meal)
      .then(() => {
        setAllMeals((prevMeals) => [...prevMeals, meal]);
        setName('');
        setType('Wet');
        setDate(new Date().toISOString().slice(0, 10));
        setTime('00:00');
        setAmount(0);
        setCalorie(0);
        closeForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="modal meal-modal">
      <img src={closeModalIcon} alt="close form" onClick={closeForm} className="close-modal-icon" />

      <div className="modal-content">
        <h2>Add New Meal</h2>

        <form onSubmit={handleSubmit} className="meal-form">
          <div className="input-area">
            <label htmlFor="name">Meal Name</label>
            <input
              type="text"
              name="name"
              id="meal-name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-area">
            <label htmlFor="type">Meal Type</label>
            <select id="type" name="meal-type" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Wet">Wet</option>
              <option value="Dry">Dry</option>
              <option value="Treat">Treat</option>
            </select>
          </div>

          <div className="input-area">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="meal-date"
              value={date}
              required
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="input-area">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              name="meal-time"
              value={time}
              required
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="input-area">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              step="0.1"
              min="0"
              max="2000"
              required
              onChange={(e) => setAmount(e.target.value)}
            />
            <span className="end-adornment">g</span>
          </div>

          <div className="input-area">
            <label htmlFor="calorie">Calories</label>
            <input
              type="number"
              id="calorie"
              name="calorie"
              value={calorie}
              min="0"
              max="2000"
              required
              onChange={(e) => setCalorie(e.target.value)}
            />
            <span className="end-adornment">kcal / 100g</span>
          </div>

          <div className="btn-area">
            <button type="submit" className="btn-contained">
              Create
            </button>
            <button className="btn-outlined" onClick={closeForm}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
