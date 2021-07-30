import { useState, useEffect } from 'react';
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';

const MealMonthChart = ({ allMeals, MER }) => {
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
    if (meals.length > 0) {
      let sum = 0;

      // get totall calorie of a month
      for (let i = 0; i < meals.length; i++) {
        let sumCalorie = meals[i].meal + meals[i].treat;
        sum = sum + sumCalorie;
      }
      setAvgCal(Math.round(sum / meals.length));

      // set average calorie of a day
    } else {
      setAvgCal(0);
    }

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
    const idealCal = Math.floor(MER) ? Math.floor(MER) : '--';

    meals.forEach((meal) =>
      graphDataArray.push({
        date: meal.date.slice(8, 10).split('-').join('/'), // e.g 2021-07-13 => 07/13
        Meal: meal.meal,
        Treat: meal.treat,
        'Monthly Average': avgCal,
        Ideal: idealCal,
      })
    );
    noDataDates.forEach((date) =>
      graphDataArray.push({
        date: date.slice(8, 10).split('-').join('/'),
        Meal: 0,
        Treat: 0,
        'Monthly Average': avgCal,
        Ideal: idealCal,
      })
    );

    graphDataArray.sort(function (a, b) {
      return a.date - b.date;
    });

    setGraphData(graphDataArray);
  };

  useEffect(() => {
    getAllFoodDataForMonth(allMeals);
    calcAvgCal(calcTotalDailyCalorie(allMealsForMonth));
  }, [allMeals, avgCal, MER]);

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
        allMealsForMonth = [];
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
    <div className="meal-month-graph">
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
            {month[0].split('-').join('/')} to {month[month.length - 1].split('-').join('/')}
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
        <p className="unit-kcal">kcal</p>
        <ResponsiveContainer>
          <AreaChart
            data={graphData}
            margin={{
              top: 0,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <Legend wrapperStyle={{ bottom: -25, left: 20 }} />
            <XAxis dataKey="date" stroke="#3b3054" />
            <YAxis stroke="#3b3054" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Meal"
              stackId="1"
              fillOpacity={0.8}
              stroke="rgba(212, 185, 222)"
              fill="rgba(212, 185, 222)"
              unit=" kcal"
            />
            <Area
              type="monotone"
              dataKey="Treat"
              stackId="1"
              fillOpacity={0.75}
              stroke="rgba(59, 48, 84)"
              fill="rgba(59, 48, 84)"
              unit=" kcal"
            />
            <Area
              type="monotone"
              dataKey="Monthly Average"
              stroke="rgba(59, 48, 84, 0.6)"
              fillOpacity={0}
              unit=" kcal"
            />
            <Area type="monotone" dataKey="Ideal" stroke="rgba(252, 136, 123, 1)" fillOpacity={0} unit=" kcal" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MealMonthChart;
