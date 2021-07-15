import { useState, useEffect } from 'react';

const WalkDayChart = ({ allActivities }) => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [activityForDay, setActivityForDay] = useState([]); // each input on the date

  useEffect(() => {
    let allWalk = [];

    for (let i = 0; i < allActivities.length; i++) {
      const activeDate = allActivities[i].date.slice(0, 10);
      if (date === activeDate) {
        //setActivityForDay((meal) => ({...meal, date: activities[i].activities}))
        allWalk.push({
          id: allActivities[i].id,
          date: allActivities[i].date.slice(0, 10),
          minute: allActivities[i].minute,
          distance: allActivities[i].distance,
          name: allActivities[i].name,
        });
      }
    }
    setActivityForDay(allWalk);
  }, [allActivities, date]);

  return (
    <div className="walk-daily-record">
      <div className="background-color-wrapper">
        <div className="info">
          {/* temporary styling */}
          <h3>Daily Activities</h3>
          <label>
            Choose a date:
            <input
              type="date"
              id="walk-date"
              name="walk-date"
              defaultValue={date}
              required
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          {activityForDay.length > 0 && date === activityForDay[0].date ? (
            <div className="daily-list">
              <p>{activityForDay[0].date.split('-').join('/')}</p>
              {activityForDay.map((activity) => (
                <div className="list-item">
                  <p key={activity.id}>Activity Name:&nbsp;{activity.name},</p>
                  <p key={activity.id}>Duratinon:&nbsp;{activity.minute} min,</p>
                  <p key={activity.id}>
                    Distance:&nbsp;
                    {activity.distance ? activity.distance + 'km' : 'no data entered'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No activity is added</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalkDayChart;
