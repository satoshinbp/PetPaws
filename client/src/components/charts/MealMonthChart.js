import { useState, useEffect } from 'react';
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
const MealMonthChart = ({ allMeals }) => {
  const createWeekDates = (startDay, endDay) => {
    let tempWeek = [];
    for (let i = startDay; i < endDay; i++) {
      tempWeek.push(new Date(new Date().setDate(new Date().getDate() - i)).toISOString().slice(0, 10));
    }
    return tempWeek;
  };
  const [avgCal, setAvgCal] = useState([]);
  const [graphData, setGraphData] = useState([]);
  let allMealsForMonth = [];
  //for arrow buttons
  const [count, setCount] = useState(0);
  // in order to know if the loading is first time or not
  // in order to prevent setNewGraph from being fired on the first loading
  const [firstTime, setFirstTime] = useState(true);

  // ************************************

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

  // ***************************************

  const getAllFoodDataForMonth = (meals) => {
    for (let i = 0; i < month.length; i++) {
      const date = month[i];
      for (let y = 0; y < meals.length; y++) {
        const activeDate = meals[y].date.slice(0, 10);
        if (date === activeDate) {
          if (meals[y].type === 'Wet' || meals[y].type === 'Dry') {
            const foodType = 'meal';
            allMealsForMonth.push({ date: activeDate, type: foodType, meal: meals[y].calorie, treat: 0 });
          } else {
            const foodType = 'treat';
            allMealsForMonth.push({ date: activeDate, type: foodType, meal: 0, treat: meals[y].calorie });
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

    // get totall calorie of a month
    for (let i = 0; i < meals.length; i++) {
      let sumCalorie = meals[i].meal + meals[i].treat;
      sum = sum + sumCalorie;
    }

    // set average calorie of a day
    setAvgCal(Math.round(sum / meals.length));

    let graphDataArray = [];

    // get dates when there was no input in a day
    const noDataDates = month.filter((o1) => {
      // filter out (!) items in noDataDates2
      return !meals.some((o2) => {
        if (o1 === o2.date) {
          return o2;
        }
      });
    });

    meals.forEach((meal) =>
      graphDataArray.push({
        date: meal.date.split('-').join('/'),
        meal: meal.meal,
        treat: meal.treat,
        'average calorie': avgCal,
      })
    );
    noDataDates.forEach((date) =>
      graphDataArray.push({
        date: date.split('-').join('/'),
        meal: 0,
        treat: 0,
        'average calorie': avgCal,
      })
    );

    graphDataArray.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    setGraphData(graphDataArray);
  };

  useEffect(() => {
    getAllFoodDataForMonth(allMeals);
    calcAvgCal(calcTotalDailyCalorie(allMealsForMonth));
  }, [allMeals, avgCal]);

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
        console.log(count);
        if (count !== 0) {
          setMonth(getChosenMonthDates());
          pastMonth = getChosenMonthDates();
        } else if (count === 0) {
          // setMonth for calcAvgCalorie
          setMonth(getThisMonthDates());
          pastMonth = getThisMonthDates();
        }
        allMealsForMonth = [];
        console.log(pastMonth);
        for (let i = 0; i < pastMonth.length; i++) {
          const date = pastMonth[i];
          for (let y = 0; y < allMeals.length; y++) {
            const activeDate = allMeals[y].date.slice(0, 10);
            if (date === activeDate) {
              if (allMeals[y].type === 'Wet' || allMeals[y].type === 'Dry') {
                const foodType = 'meal';
                allMealsForMonth.push({ date: activeDate, type: foodType, meal: allMeals[y].calorie, treat: 0 });
              } else {
                const foodType = 'treat';
                allMealsForMonth.push({ date: activeDate, type: foodType, meal: 0, treat: allMeals[y].calorie });
              }
            }
          }
        }
        const meals = calcTotalDailyCalorie(allMealsForMonth);

        calcAvgCal(meals);
      }
    };

    setNewGraph();
  }, [count, avgCal]);

  return (
    <div className="month-graph" style={{ marginTop: '20vh' }}>
      {/* temporary styling marginBottom */}
      <h2>Month Chart</h2>

      <div style={{ height: '260px' }}>
        {/* MUST set height to display chart */}
        {/* 確認用 */}
        {/*graphData.map((meal) => (
          <p key={meal.date}>
            {meal.date}, meal: {meal.meal}, treat: {meal.treat} avgCal: {meal.avgCal}
          </p>
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
            {month[0]} to {month[month.length - 1]}
          </p>
        ) : (
          ''
        )}
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="average calorie"
              stroke="#00aced"
              fillOpacity={0.3}
              fill="rgba(0, 172, 237, 0)"
            />
            <Area type="monotone" dataKey="meal" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="treat" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MealMonthChart;
