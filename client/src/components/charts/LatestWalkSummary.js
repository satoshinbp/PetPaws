import { useState, useEffect } from 'react';
import Axios from 'axios';
import firebase from 'firebase/app';

const LatestWalkSummary = ({}) => {
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
  const [data, setData] = useState([]); // all data from api
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
    const averageDistance = distanceSum / walks.length;
    setAvgMin(averageTime);
    setAvgDistance(averageDistance);

    // let graphDataArray = [];

    // // get dates when there was no input in a day
    // const noDataDates = week.filter((o1) => {
    //   // filter out (!) items in noDataDates2
    //   return !walks.some((o2) => {
    //     if (o1 === o2.date) {
    //       return o2;
    //     }
    //   });
    // });
    // walks.forEach((walk) =>
    //   graphDataArray.push({
    //     date: walk.date,
    //     minute: walk.minute,
    //     distance: walk.distance,
    //     avgMin: avgMin,
    //   })
    // );
    // noDataDates.forEach((walk) =>
    //   graphDataArray.push({
    //     date: walk,
    //     minute: 0,
    //     distance: 0,
    //     avgMin: avgMin,
    //   })
    // );

    // graphDataArray.sort(function (a, b) {
    //   return new Date(b.date) - new Date(a.date);
    // });
  };

  useEffect(() => {
    const getUid = async () => {
      const uid = await firebase.auth().currentUser.uid;
      await Axios.get('http://localhost:3001/api/activity')
        .then((response) => {
          let userData = [];
          response.data.filter((walk) => walk.uid === uid).forEach((walk) => userData.push(walk));
          setData(userData);
          getWalkData(data);
          // setWeekData(allWalkData);
          const walks = sumUpTime(allWalkData);
          getAvgWalk(walks);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUid();
  }, [avgMin]);

  return (
    <div>
      <h3>Avg Distance(Km)</h3>
      <p>{avgDistance} Km</p>
      <h3>Avg Time(Min)</h3>
      <p>{avgMin} Min</p>
    </div>
  );
};

export default LatestWalkSummary;
