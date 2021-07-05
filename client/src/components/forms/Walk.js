import { useState } from 'react';

export default function WalkForm({ onAdd }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);

  const addWalk = async (walk) => {
    console.log(walk); // Test purpose, to be removed

    /* The fllowing part is to connect to database, to be completed once api is ready */

    // const res = await fetch('http://localhost:5000/meals', {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify(walk),
    // });

    // const data = await res.json();

    // setWalks([...walks, data]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addWalk({ name, date, duration, distance });

    setName('');
    setDate(new Date().toISOString().slice(0, 10));
    setDuration(0);
    setDistance(0);
  };

  return (
    <div>
      <h2>Add New Activity</h2>
      {/* Styling to be removed */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
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
          <label htmlFor="duration">Duration</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={duration}
            required
            onChange={(e) => setDuration(e.target.value)}
          />
          minutes
        </div>

        <div>
          <label htmlFor="amount">Distance(m): </label>
          <input
            type="number"
            id="distance"
            name="distance"
            value={distance}
            min="0"
            max="50000"
            onChange={(e) => setDistance(e.target.value)}
          />
        </div>

        <div>
          <button>Cancel</button>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}
