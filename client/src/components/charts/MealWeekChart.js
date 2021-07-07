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
  BarChart,
  Area,
} from 'recharts';
import Axios from 'axios';
import firebase from 'firebase/app';

const MealWeekChart = ({}) => {
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
  const [graphData, setGraphData] = useState([]);
  const [avgCal, setAvgCal] = useState([]);
  let allFoodData = [];
  const [count, setCount] = useState(0);
  const [firstTime, setFirstTime] = useState(true);

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

    graphDataArray.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    setGraphData(graphDataArray);
    console.log(graphDataArray);
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
  }, [avgCal]);

  useEffect(() => {
    const setNewGraph = () => {
      let pastWeek;
      if (!firstTime) {
        console.log(count);
        if (count !== 0) {
          const start = count * 7;
          const end = start + 7;
          setWeek(getWeek(start, end));
          pastWeek = getWeek(start, end);
        } else if (count === 0) {
          setWeek(getWeek(0, 7));
          pastWeek = getWeek(0, 7);
        }

        for (let i = 0; i < 7; i++) {
          const date = pastWeek[i];

          for (let y = 0; y < data.length; y++) {
            const mealDate = data[y].date.slice(0, 10);
            if (date === mealDate) {
              if (data[y].type === 'Wet' || data[y].type === 'Dry') {
                const foodType = 'meal';
                allFoodData.push({ date: mealDate, type: foodType, meal: data[y].calorie, treat: 0 });
              } else {
                const foodType = 'treat';
                allFoodData.push({ date: mealDate, type: foodType, meal: 0, treat: data[y].calorie });
              }
            }
          }
        }
        setWeekData(allFoodData);

        getAvgCal(sumUpCalorie(allFoodData));
      }
    };

    setNewGraph();
  }, [count]);

  return (
    <div style={{ height: '260px' }}>
      {' '}
      {/* MUST set height to display chart */}
      {/*testCal.map((item) => (
                <p>{item.date}</p>
            ))*/}
      {/* 確認用 */}
      {/*graphData.map((meal) => (
                <p key={meal.date}>{meal.date}, meal: {meal.meal}, treat: {meal.treat} avgCal: {meal.avgCal}</p>
            ))*/}
      <br></br>
      {/*test.map((meal) => (
                <p key={meal.date}>{meal.date}, meal: {meal.meal}, treat: {meal.treat} avgCal: {meal.avgCal}</p>
            ))*/}
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
      <ResponsiveContainer>
        <ComposedChart data={graphData} margin={{ left: 0 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Area type="monotone" dataKey="avgCal" stroke="#00aced" fillOpacity={0.3} fill="rgba(0, 172, 237, 0.2)" />
          <Bar barSize={15} fillOpacity={1} dataKey="meal" stackId="intake" fill="#85d6c3" />
          <Bar barSize={15} fillOpacity={1} dataKey="treat" stackId="intake" fill="#363869" />
        </ComposedChart>
      </ResponsiveContainer>
      {/*<ResponsiveContainer>
            <BarChart
				width={500}
				height={300}
				data={test}
                margin={{left: 0 }}  // to get rid of extra space
			>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="meal" stackId="a" barSize={15} fill="#85d6c3" />
                <Bar dataKey="treat" stackId="a" barSize={15} fill="#363869" />
			</BarChart>
            </ResponsiveContainer>*/}
    </div>
  );
};

export default MealWeekChart;
