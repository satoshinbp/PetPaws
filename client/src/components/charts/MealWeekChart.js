import { useState, useEffect } from 'react';
import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area } from 'recharts';

const MealWeekChart = ({ allMeals }) => {
  const createWeekDates = (startDay, endDay) => {
    let tempWeek = [];
    for (let i = startDay; i < endDay; i++) {
      tempWeek.push(new Date(new Date().setDate(new Date().getDate() - i)).toISOString().slice(0, 10));
    }
    return tempWeek;
  };
  // default is the past seven days (this week)
  const [week, setWeek] = useState(createWeekDates(0, 7));
  const [avgCal, setAvgCal] = useState([]);
  const [graphData, setGraphData] = useState([]);
  let allMealsForWeek = [];
  //for arrow buttons
  const [count, setCount] = useState(0);
  // in order to know if the loading is first time or not
  // in order to prevent setNewGraph from being fired on the first loading
  const [firstTime, setFirstTime] = useState(true);

  const getAllFoodDataForAWeek = (meals) => {
    for (let i = 0; i < 7; i++) {
      const date = week[i];
      for (let y = 0; y < meals.length; y++) {
        const activeDate = meals[y].date.slice(0, 10);
        if (date === activeDate) {
          if (meals[y].type === 'Wet' || meals[y].type === 'Dry') {
            const foodType = 'meal';
            allMealsForWeek.push({ date: activeDate, type: foodType, meal: meals[y].calorie, treat: 0 });
          } else {
            const foodType = 'treat';
            allMealsForWeek.push({ date: activeDate, type: foodType, meal: 0, treat: meals[y].calorie });
          }
        }
      }
    }
  };

  // SUM UP CALORIE FOR MEAL AND TREAT RESPECTIVELY PER DAY
  const calcTotalDailyCalorie = (meals) => {
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
    let sumCalorie = [];
    for (let prop in temp) sumCalorie.push(temp[prop]);
    return sumCalorie;
  };

  // CALCULATE AVERAGE CALORIE PER DAY
  // INSERT AVERAGE CALORIE ANYWAY,
  // EVEN IF THERE WAS NO INPUT (FOR PURPOSE OF GRAPH)
  const calcAvgCal = (meals) => {
    let sum = 0;

    // get totall calorie of a week
    for (let i = 0; i < meals.length; i++) {
      let sumCalorie = meals[i].meal + meals[i].treat;
      sum = sum + sumCalorie;
    }

    // set average calorie of a day
    setAvgCal(Math.round(sum / meals.length));

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
      return new Date(a.date) - new Date(b.date);
    });

    setGraphData(graphDataArray);
  };

  useEffect(() => {
    getAllFoodDataForAWeek(allMeals);
    calcAvgCal(calcTotalDailyCalorie(allMealsForWeek));
  }, [allMeals, avgCal]);

  useEffect(() => {
    const setNewGraph = () => {
      let pastWeek;
      if (!firstTime) {
        console.log(count);
        if (count !== 0) {
          const start = count * 7;
          const end = start + 7;
          // setWeek for calcAvgCalorie
          setWeek(createWeekDates(start, end));
          pastWeek = createWeekDates(start, end);
        } else if (count === 0) {
          // setWeek for calcAvgCalorie
          setWeek(createWeekDates(0, 7));
          pastWeek = createWeekDates(0, 7);
        }
        allMealsForWeek = [];
        for (let i = 0; i < 7; i++) {
          const date = pastWeek[i];
          for (let y = 0; y < allMeals.length; y++) {
            const activeDate = allMeals[y].date.slice(0, 10);
            if (date === activeDate) {
              if (allMeals[y].type === 'Wet' || allMeals[y].type === 'Dry') {
                const foodType = 'meal';
                allMealsForWeek.push({ date: activeDate, type: foodType, meal: allMeals[y].calorie, treat: 0 });
              } else {
                const foodType = 'treat';
                allMealsForWeek.push({ date: activeDate, type: foodType, meal: 0, treat: allMeals[y].calorie });
              }
            }
          }
        }
        const meals = calcTotalDailyCalorie(allMealsForWeek);

        calcAvgCal(meals);
      }
    };

    setNewGraph();
  }, [count, avgCal]);

  return (
    <div style={{ height: '260px' }}>
      {/* 確認用 */}
      {/*graphData.map((meal) => (
                <p key={meal.date}>{meal.date}, meal: {meal.meal}, treat: {meal.treat} avgCal: {meal.avgCal}</p>
            ))*/}
      <br></br>
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
          <Bar barSize={15} fillOpacity={1} dataKey="treat" stackId="intake" fill="#363869" />
          <Bar barSize={15} fillOpacity={1} dataKey="meal" stackId="intake" fill="#85d6c3" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MealWeekChart;
