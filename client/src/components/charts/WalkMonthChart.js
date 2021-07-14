import { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  AreaChart,
} from 'recharts';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';

const WalkMonthChart = ({ allActivities }) => {
  const createWeekDates = (startDay, endDay) => {
    let tempWeek = [];
    for (let i = startDay; i < endDay; i++) {
      tempWeek.push(new Date(new Date().setDate(new Date().getDate() - i)).toISOString().slice(0, 10));
    }
    return tempWeek;
  };
  let allActivityPerWeek = []; // for filterWeekActivities()
  // average minutes of activity in the month // in order to prepare graphData
  const [avgMin, setAvgMin] = useState([]);
  // finalized activities for graph
  const [graphData, setGraphData] = useState([]);
  // for arrow buttons
  const [count, setCount] = useState(0);
  // in order to know if the loading is first time or not
  // in order to prevent setNewGraph from being fired on the first loading
  const [firstTime, setFirstTime] = useState(true);

  //***************************************** */
  const getThisMonthDates = () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const duration = { start: firstDay, end: lastDay };
    const rawDataForEachDate = eachDayOfInterval(duration);
    let allDates = [];
    rawDataForEachDate.forEach((item) => {
      allDates.push(item.toISOString().slice(0, 10));
    });
    return allDates;
  };
  const [month, setMonth] = useState(getThisMonthDates);
  //********************************************** */

  // FILTER AND GET ALL ACTIVITY DATA IN THE CHOSEN WEEK
  const filterWeekActivities = (activities) => {
    for (let i = 0; i < month.length; i++) {
      const date = month[i];
      for (let y = 0; y < activities.length; y++) {
        const activeDate = activities[y].date.slice(0, 10);
        if (date === activeDate) {
          const distance = parseFloat(activities[y].distance);
          const minute = parseInt(activities[y].minute);
          allActivityPerWeek.push({
            date: activeDate,
            minute: minute,
            distance: distance,
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
    if (activities.length > 0) {
      let sum = 0;

      // get totall calorie of a week
      for (let i = 0; i < activities.length; i++) {
        sum = sum + activities[i].minute;
      }

      // get average calorie of a day
      setAvgMin(Math.round(sum / activities.length));
    } else {
      setAvgMin(0);
    }

    let graphDataArray = [];

    // get dates when there was no input in a day
    const noDataDates = month.filter((o1) => {
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
        date: date.date.slice(8, 10).split('-').join('/'),
        minute: date.minute,
        distance: date.distance,
        average: avgMin,
      })
    );
    // inactive dates
    noDataDates.forEach((date) =>
      graphDataArray.push({
        date: date.slice(8, 10).split('-').join('/'),
        minute: 0,
        distance: 0,
        average: avgMin,
      })
    );

    // sort our the array based on date
    graphDataArray.sort(function (a, b) {
      return a.date - b.date;
    });

    setGraphData(graphDataArray);
  };

  // FIRST TIME LORDING
  useEffect(() => {
    filterWeekActivities(allActivities);
    const totalDailyActivity = calcTotalDailyActivity(allActivityPerWeek);
    calcAvgMinute(totalDailyActivity);
  }, [allActivities, avgMin]);

  // FOR ARROW BUTTONS TO GET DATA OF PAST MONTHS AND COMING MONTHS
  useEffect(() => {
    const getChosenMonthDates = () => {
      // first day of chosen month
      const date = new Date();
      const firstDay = new Date(date.getFullYear(), date.getMonth() - count, 1);
      // last day
      // 1 = this month(default)
      // e.g. when count is 1 (last month) monthConverter = 0,
      // which is used for "lastDay"
      const monthConverter = 1 - count;
      const lastDay = new Date(date.getFullYear(), date.getMonth() + monthConverter, 0); // set duration to get chosen month's(interval) dates
      const duration = { start: firstDay, end: lastDay };
      // get each dates of duration
      const rawDataForEachDate = eachDayOfInterval(duration);
      let allDates = [];
      rawDataForEachDate.forEach((item) => {
        allDates.push(item.toISOString().slice(0, 10));
      });

      return allDates;
    };

    const setNewGraph = () => {
      let pastMonth;
      if (!firstTime) {
        if (count !== 0) {
          setMonth(getChosenMonthDates());
          pastMonth = getChosenMonthDates();
        } else if (count === 0) {
          // setMonth for calcAvgCalorie
          setMonth(getThisMonthDates());
          pastMonth = getThisMonthDates();
        }

        for (let i = 0; i < 7; i++) {
          const date = pastMonth[i];

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
    <div className="walk-month-graph">
      {/* MUST set height to display chart */}
      {/* 確認用 */}
      {/*graphData.map((meal) => (
                <p key={meal.date}>{meal.date}, minute: {meal.minute}, distance: {meal.distance} avgMin: {meal.avgMin}</p>
            ))*/}
      <div className="month-controller">
        <button
          onClick={() => {
            setFirstTime(false);
            setCount(count + 1);
          }}
        >
          ＜
        </button>
        {graphData.length > 0 ? (
          <p>
            {month[0].split('-').join(' ')} to {month[month.length - 1].split('-').join(' ')}
          </p>
        ) : (
          ''
        )}
        <button
          onClick={() => {
            setCount(count - 1);
          }}
        >
          ＞
        </button>
      </div>
      <div className="graph-height">
        <ResponsiveContainer>
          <AreaChart
            data={graphData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="average" stroke="#00aced" fillOpacity={0.3} fill="rgba(0, 172, 237, 0)" />
            <Area type="monotone" dataKey="minute" stackId="1" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
        <br></br>
      </div>
    </div>
  );
};

export default WalkMonthChart;
