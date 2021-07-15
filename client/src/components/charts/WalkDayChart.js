import { useState, useEffect } from 'react';

const WalkDayChart = ({ allActivities }) => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [activityForDay, setDateData] = useState([]); // each input on the date

  useEffect(() => {
    let allWalk = [];

    for (let i = 0; i < allActivities.length; i++) {
      const activeDate = allActivities[i].date.slice(0, 10);
      if (date === activeDate) {
        //setDateData((meal) => ({...meal, date: activities[i].activities}))
        allWalk.push({
          id: allActivities[i].id,
          date: activeDate,
          minute: allActivities[i].minute,
          distance: allActivities[i].distance,
          name: allActivities[i].name,
        });
      }
    }
    setDateData(allWalk);
  }, [allActivities, date]);

  return (
    <div style={{ border: '1px solid' }}>
      {/* temporary styling */}
      <h2>Walk Day Chart</h2>
      {activityForDay.length > 0 ? (
        activityForDay.map((meal) => (
          <p key={meal.id}>
            Date:&nbsp;{meal.date}&nbsp;&nbsp;&nbsp; Duratinon:&nbsp;{meal.minute} min&nbsp;&nbsp;&nbsp; Distance:&nbsp;
            {meal.distance ? meal.distance + 'km' : 'no activities'}
          </p>
        ))
      ) : (
        <p>No activity is added</p>
      )}
      <input
        type="date"
        id="walk-date"
        name="walk-date"
        defaultValue={date}
        required
        onChange={(e) => setDate(e.target.value)}
      />
    </div>
  );
};

export default WalkDayChart;
