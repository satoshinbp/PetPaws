import { useState, useEffect } from 'react';
import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import Axios from 'axios';
import firebase from 'firebase/app';

const LatestCalorieSummary = ({ MER }) => {
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
  const [data, setData] = useState([]); // all data from api
  const [weekData, setWeekData] = useState([]);
  const [avgCal, setAvgCal] = useState([]);
  let allFoodData = [];
  const [graphData, setGraphData] = useState(null);

  const colors = ['#1f77b4', '#2ca02c'];

  // GET ALL FOOD DATA FOR A WEEK
  const getFoodData = (meals) => {
    for (let i = 0; i < 7; i++) {
      const date = week[i];
      for (let y = 0; y < meals.length; y++) {
        const mealDate = meals[y].date.slice(0, 10);
        if (date === mealDate) {
          if (meals[y].type === 'Wet' || meals[y].type === 'Dry') {
            const foodType = 'meal';
            allFoodData.push({ date: mealDate, type: foodType, meal: meals[y].calorie, treat: 0 });
          } else {
            const foodType = 'treat';
            allFoodData.push({ date: mealDate, type: foodType, meal: 0, treat: meals[y].calorie });
          }
        }
      }
    }
    setWeekData(allFoodData);
  };

  // SUM UP CALORIE FOR MEAL AND TREAT RESPECTIVELY PER DAY
  const sumUpCalorie = (meals) => {
    let temp = {};
    let obj = null;
    for (let j = 0; j < meals.length; j++) {
      obj = meals[j];

      if (!temp[obj.date]) {
        temp[obj.date] = obj;
      } else {
        temp[obj.date].meal += obj.meal;
        temp[obj.date].treat += obj.treat;
      }
    }
    let dayCalorie = [];
    for (let prop in temp) dayCalorie.push(temp[prop]);
    return dayCalorie;
  };

  // CALCULATE AVERAGE CALORIE PER DAY
  // INSERT AVERAGE CALORIE ANYWAY,
  // EVEN IF THERE WAS NO INPUT (FOR PURPOSE OF GRAPH)
  const getAvgCal = (meals) => {
    let sum = 0;

    // get totall calorie of a week
    for (let i = 0; i < meals.length; i++) {
      let sumCalorie = meals[i].meal + meals[i].treat;
      sum = sum + sumCalorie;
    }

    // get average calorie of a day
    const averageCalorie = Math.round(sum / meals.length);

    setAvgCal(averageCalorie);

    let graphDataArray = [];

    // get dates when there was no input in a day
    const noDataDates = week.filter((o1) => {
      // filter out (!) items in noDataDates2
      return !meals.some((o2) => {
        if (o1 === o2.date) {
          return o2;
        }
      });
    });

    meals.forEach((meal) =>
      graphDataArray.push({
        date: meal.date,
        meal: meal.meal,
        treat: meal.treat,
        avgCal: avgCal,
      })
    );
    noDataDates.forEach((date) =>
      graphDataArray.push({
        date: date,
        meal: 0,
        treat: 0,
        avgCal: avgCal,
      })
    );
    const roundMER = Math.floor(MER);
    // setGraphData(graphDataArray);
    setGraphData([
      { value: 'intake', calorie: avgCal },
      { value: 'ideal', calorie: roundMER },
    ]);
  };

  useEffect(() => {
    const getUid = async () => {
      const uid = await firebase.auth().currentUser.uid;
      await Axios.get('http://localhost:3001/api/meal').then((response) => {
        let userData = [];
        response.data.filter((meal) => meal.uid === uid).forEach((meal) => userData.push(meal));
        setData(userData);
        setData(userData);
        getFoodData(userData);
        getAvgCal(sumUpCalorie(allFoodData));
      });
    };

    getUid();
  }, [MER]);

  return (
    <div style={{ border: '1px solid' }}>
      {/* temporary styling */}
      <h3>Avg Calories(Kcal)</h3>
      <div style={{ height: '150px' }}>
        {/* height is necessary to display graph */}
        {graphData ? (
          <ResponsiveContainer>
            <ComposedChart layout="vertical" data={graphData} margin={{ top: 20, right: 20, bottom: 0, left: 25 }}>
              <XAxis type="number" domain={[0, 'dataMax']} />
              <YAxis type="category" dataKey="value" />
              <Tooltip /> {/* values shown when hovered */}
              <Bar dataKey="calorie" barSize={20} stroke="rgba(34, 80, 162, 0.2)" fillOpacity={1} fill="#2250A2">
                {graphData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          'Loading...'
        )}
      </div>
    </div>
  );
};

export default LatestCalorieSummary;
