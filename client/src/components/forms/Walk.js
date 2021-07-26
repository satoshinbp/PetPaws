import { useState } from 'react';
import Axios from 'axios';
import closeModalIcon from '../../images/close-modal.svg';

export default function WalkForm({ petProfile, setAllActivities, closeForm }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [minute, setMinute] = useState(0);
  const [distance, setDistance] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const activity = { petID: petProfile.id, name, date, minute, distance };

    Axios.post('http://localhost:3001/api/activity', activity)
      .then(() => {
        setAllActivities((prevActivities) => [...prevActivities, activity]);
        setName('');
        setDate(new Date().toISOString().slice(0, 10));
        setMinute(0);
        setDistance(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="walk-form wrapper">
      <img src={closeModalIcon} alt="close form" onClick={closeForm} className="close-modal-icon" />

      <div className="walk-form-content">
        <h2>Add New Activity</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <div>
              <label htmlFor="name">Activity Name</label>
              <input
                type="text"
                name="name"
                id="activity-name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="activity-date"
                defaultValue={date}
                required
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="minute">Duration</label>
              <input
                type="number"
                id="minute"
                name="minute"
                value={minute}
                required
                onChange={(e) => setMinute(e.target.value)}
              />
              <p className="input-unit">min</p>
            </div>

            <div>
              <label htmlFor="amount">Distance</label>
              <input
                type="number"
                id="distance"
                name="distance"
                value={distance}
                min="0"
                max="10"
                step="0.1"
                onChange={(e) => setDistance(e.target.value)}
              />
              <p className="input-unit">km</p>
            </div>
          </div>
          <div className="button-wrapper">
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
