import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function WalkForm({ onAdd }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [start, setStart] = useState(''); // option "wet" "dry" "treat"
  const [end, setEnd] = useState(''); // time of meal
  const [distance, setDistance] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(`${name} ${date} ${start} ${end} ${distance} `);

    onAdd({ name, date, start, end, distance });

    setName('');
    setDate('');
    setStart('');
    setEnd('');
    setDistance('');
  };

  return (
    <div>
      <h2>Add New Activity</h2>
      {/* Styling to be removed */}
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <label htmlFor="name">Name</label>
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
          <label htmlFor="date">Date: </label>
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
          <label htmlFor="time">Start Time: </label>
          <input
            type="time"
            id="start-time"
            name="start-time"
            value={start}
            required
            onChange={(e) => setStart(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="time">End Time: </label>
          <input
            type="time"
            id="end-time"
            name="end-time"
            value={end}
            required
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="amount">Distance(m): </label>
          <input
            type="number"
            id="amount"
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
      <Link to="/">Go Back</Link>
    </div>
  );
}
