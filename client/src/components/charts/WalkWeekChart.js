import { useState, useEffect } from 'react';
import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area } from 'recharts';

const WalkWeekChart = ({ allActivities }) => {
  const createWeekDates = (startDay, endDay) => {
    let tempWeek = [];
    for (let i = startDay; i < endDay; i++) {
      tempWeek.push(new Date(new Date().setDate(new Date().getDate() - i)).toISOString().slice(0, 10));
    }
    return tempWeek;
  };
  // default is dates between today and 6 days ago
  const [week, setWeek] = useState(createWeekDates(0, 7));
  let allActivityPerWeek = []; // for filterWeekActivities()
  // average minutes of activity in the week // in order to prepare graphData
  const [avgMin, setAvgMin] = useState([]);
  // finalized activities for graph
  const [graphData, setGraphData] = useState([]);
  // for arrow buttons
  const [count, setCount] = useState(0);
  // in order to know if the loading is first time or not
  // in order to prevent setNewGraph from being fired on the first loading
  const [firstTime, setFirstTime] = useState(true);

  // FILTER AND GET ALL ACTIVITY DATA IN THE CHOSEN WEEK
  const filterWeekActivities = (activities) => {
    for (let i = 0; i < 7; i++) {
      const date = week[i];
      for (let y = 0; y < activities.length; y++) {
        const activeDate = activities[y].date.slice(0, 10);
        if (date === activeDate) {
          allActivityPerWeek.push({
            date: activeDate,
            minute: activities[y].minute,
            distance: activities[y].distance,
            name: activities[y].name,
          });
        }
      }
    }
  };

  // SUM UP DISTANCE AND MINUTE RESPECTIVELY PER DAY
  const calcTotalDailyActivity = (activities) => {
    let temp = {};
    let obj = null;
    for (let j = 0; j < activities.length; j++) {
      obj = activities[j];

      if (!temp[obj.date]) {
        temp[obj.date] = obj;
      } else {
        temp[obj.date].minute += obj.minute;
        temp[obj.date].distance += obj.distance;
      }
    }
    let sumActivity = [];
    for (let prop in temp)
      sumActivity.push({
        name: temp[prop].name,
        date: temp[prop].date,
        minute: temp[prop].minute,
        distance: Math.round(temp[prop].distance * 10) / 10,
      });
    return sumActivity;
  };

  // CALCULATE AVERAGE CALORIE PER DAY
  // INSERT AVERAGE CALORIE ANYWAY,
  // EVEN IF THERE WAS NO INPUT (FOR PURPOSE OF GRAPH)
  const calcAvgMinute = (activities) => {
    let sum = 0;

    // get totall calorie of a week
    for (let i = 0; i < activities.length; i++) {
      sum = sum + activities[i].minute;
    }

    // get average calorie of a day
    setAvgMin(Math.round(sum / activities.length));

    let graphDataArray = [];

    // get dates when there was no input in a day
    const noDataDates = week.filter((o1) => {
      // filter out (!activities) items in noDataDates
      return !activities.some((o2) => {
        if (o1 === o2.date) {
          return o2;
        }
      });
    });

    // active dates
    activities.forEach((date) =>
      graphDataArray.push({
        date: date.date.split('-').join('/'),
        minute: date.minute,
        distance: date.distance,
        average: avgMin,
      })
    );
    // inactive dates
    noDataDates.forEach((date) =>
      graphDataArray.push({
        date: date.split('-').join('/'),
        minute: 0,
        distance: 0,
        average: avgMin,
      })
    );

    // sort our the array based on date
    graphDataArray.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });
    setGraphData(graphDataArray);
  };

  // FIRST TIME LORDING
  useEffect(() => {
    filterWeekActivities(allActivities);
    const totalDailyActivity = calcTotalDailyActivity(allActivityPerWeek);
    calcAvgMinute(totalDailyActivity);
  }, [allActivities, avgMin]);

  // FOR ARROW BUTTONS TO GET DATA OF PAST WEEKS AND COMING WEEKS
  useEffect(() => {
    const setNewGraph = () => {
      let pastWeek;
      if (!firstTime) {
        if (count !== 0) {
          const start = count * 7;
          const end = start + 7;
          setWeek(createWeekDates(start, end));
          pastWeek = createWeekDates(start, end);
        } else if (count === 0) {
          setWeek(createWeekDates(0, 7));
          pastWeek = createWeekDates(0, 7);
        }

        for (let i = 0; i < 7; i++) {
          const date = pastWeek[i];

          for (let y = 0; y < allActivities.length; y++) {
            const activeDate = allActivities[y].date.slice(0, 10);
            if (date === activeDate) {
              allActivityPerWeek.push({
                date: activeDate,
                minute: allActivities[y].minute,
                distance: allActivities[y].distance,
                name: allActivities[y].name,
              });
            }
          }
        }
        const totalDailyActivity = calcTotalDailyActivity(allActivityPerWeek);
        calcAvgMinute(totalDailyActivity);
      }
    };

    setNewGraph();
  }, [count]);

  return (
    <div style={{ height: '300px' }}>
      {/* MUST set height to display chart */}
      <h2>Walk Graph</h2>
      {/*testCal.map((item) => (
                <p>{item.date}</p>
            ))*/}
      {/* 確認用 */}
      {/*graphData.map((meal) => (
                <p key={meal.date}>{meal.date}, minute: {meal.minute}, distance: {meal.distance} avgMin: {meal.avgMin}</p>
            ))*/}
      <br></br>
      <div className="week-controller">
        <button
          onClick={() => {
            setFirstTime(false);
            setCount(count + 1);
          }}
        >
          ＜
        </button>
        <button
          onClick={() => {
            setCount(count - 1);
          }}
        >
          ＞
        </button>
        {graphData.length > 0 ? (
          <p>
            {graphData[6].date} to {graphData[0].date}
          </p>
        ) : (
          ''
        )}
      </div>
      <ResponsiveContainer>
        <ComposedChart data={graphData} margin={{ left: 0 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Area type="monotone" dataKey="average" stroke="#00aced" fillOpacity={0.3} fill="rgba(0, 172, 237, 0.2)" />
          <Bar barSize={15} fillOpacity={1} fill="#2250A2" dataKey="minute" stackId="a" barSize={15} fill="#85d6c3" />
        </ComposedChart>
      </ResponsiveContainer>
      <br></br>
    </div>
  );
};

export default WalkWeekChart;
