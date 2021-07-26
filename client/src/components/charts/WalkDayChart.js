import { useState, useEffect } from 'react';
import format from 'date-fns/format';

const WalkDayChart = ({ allActivities }) => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [activityForDay, setActivityForDay] = useState([]); // each input on the date
  const [dateToDisplay, setDateToDisplay] = useState(null);

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
        // format time to display in the daily activity list
        const rawDateData = new Date(allActivities[i].date);
        const formattedDate = format(rawDateData, 'dd-MMMM-yyyy');
        setDateToDisplay(formattedDate.replace('-', ' ').replace('-', ', '));
      }
    }
    setActivityForDay(allWalk);
  }, [allActivities, date]);

  return (
    <div className="bg-secondary-fish">
      <div className="wrapper">
        <h2>Daily Activities</h2>

        <div className="bg-secondary-light walk-daily">
          <div className="date-picker">
            <label htmlFor="walk-date">Choose a date:</label>
            <input
              type="date"
              id="walk-date"
              name="walk-date"
              defaultValue={date}
              required
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="info">
            {activityForDay.length > 0 && date === activityForDay[0].date ? (
              <div className="daily-list">
                <p>{dateToDisplay}</p>
                {activityForDay.map((activity) => (
                  <div className="list-item" key={activity.id}>
                    <p>Activity Name:&nbsp;{activity.name},</p>
                    <p>Duratinon:&nbsp;{activity.minute} min,</p>
                    <p>
                      Distance:&nbsp;
                      {activity.distance ? activity.distance + 'km' : 'no data entered'}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No activity is added on the day</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalkDayChart;
