import { useState, useEffect } from 'react';

const LatestWalkSummary = ({ allActivities }) => {
  const getWeek = (startDay, endDay) => {
    let tempWeek = [];
    for (let i = startDay; i < endDay; i++) {
      tempWeek.push(new Date(new Date().setDate(new Date().getDate() - i)).toISOString().slice(0, 10));
    }
    return tempWeek;
  };
  const [startDay, setStartDay] = useState(0);
  const [endDay, setEndDay] = useState(7);
  const [week, setWeek] = useState(getWeek(startDay, endDay));
  let allWalkData = [];
  // const [weekData, setWeekData] = useState([]);
  const [avgMin, setAvgMin] = useState([]);
  const [avgDistance, setAvgDistance] = useState([]);

  // GET ALL Walk DATA FOR A WEEK
  const getWalkData = (walk) => {
    for (let i = 0; i < 7; i++) {
      const date = week[i];
      for (let y = 0; y < walk.length; y++) {
        const walkDate = walk[y].date.slice(0, 10);
        if (date === walkDate) {
          allWalkData.push({
            date: walkDate,
            minute: walk[y].minute,
            distance: walk[y].distance,
            name: walk[y].name,
          });
        }
      }
    }
  };

  // SUM UP DISTANCE AND MINUTE RESPECTIVELY PER DAY
  const sumUpTime = (walk) => {
    let temp = {};
    let obj = null;
    for (let j = 0; j < walk.length; j++) {
      obj = walk[j];

      if (!temp[obj.date]) {
        temp[obj.date] = obj;
      } else {
        temp[obj.date].minute += obj.minute;
        temp[obj.date].distance += obj.distance;
      }
    }
    let sumWalk = [];
    for (let prop in temp)
      sumWalk.push({
        name: temp[prop].name,
        date: temp[prop].date,
        minute: temp[prop].minute,
        distance: Math.round(temp[prop].distance * 10) / 10,
      });
    return sumWalk;
  };

  // CALCULATE AVERAGE Walk PER DAY
  // INSERT AVERAGE Walk ANYWAY,
  // EVEN IF THERE WAS NO INPUT (FOR PURPOSE OF GRAPH)
  const getAvgWalk = (walks) => {
    let timeSum = 0;
    let distanceSum = 0;

    // get totall walk of a week
    for (let i = 0; i < walks.length; i++) {
      timeSum = timeSum + walks[i].minute;
      distanceSum = distanceSum + walks[i].distance;
    }

    // get average time and distance of a day
    const averageTime = Math.round(timeSum / walks.length);
    const averageDistance = Math.round((distanceSum / walks.length) * 10) / 10;
    setAvgMin(averageTime);
    setAvgDistance(averageDistance);
  };

  useEffect(() => {
    getWalkData(allActivities);
    const walks = sumUpTime(allWalkData);
    getAvgWalk(walks);
  }, [allActivities, avgMin]);

  return (
    <div className="activity-stats">
      <div className="activity-avg">
        <p>Avg Distance(Km)</p>
        {avgDistance ? <h3>{avgDistance} Km</h3> : '--'}
      </div>
      <div className="activity-avg">
        <p>Avg Time(Min)</p>
        {avgMin ? <h3>{avgMin} Min</h3> : '--'}
      </div>
    </div>
  );
};

export default LatestWalkSummary;
