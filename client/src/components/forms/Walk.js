import { useState } from 'react';
import Axios from 'axios';

export default function WalkForm({ petProfile, setAllActivities, closeForm }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [minute, setMinute] = useState(0);
  const [distance, setDistance] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const activity = { petID: petProfile.id, name, date, minute, distance };

    Axios.post('https://pet-paws-langara.herokuapp.com/api/activity', activity)
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
    <div className="walk-form">
      <p onClick={closeForm}>×</p>
      <h3>ADD NEW ACTIVITY</h3>
      {/* Styling to be removed */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
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
            min
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
            km
          </div>
        </div>
        <div className="button-wrapper">
          <button type="submit" className="btn-contained-green">
            Create
          </button>
          <button className="btn-outlined">Cancel</button>
        </div>
      </form>
    </div>
  );
}
