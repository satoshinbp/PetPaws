import { useState, useEffect } from 'react';
import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area } from 'recharts';

const MealWeekChart = ({ allMeals, MER }) => {
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
  const [idealCal, setIdealCal] = useState('');

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
    const noDataDates = week.filter((o1) => {
      // filter out (!) items in noDataDates2
      return !meals.some((o2) => {
        if (o1 === o2.date) {
          return o2;
        }
      });
    });
    setIdealCal(Math.floor(MER));

    // prepare data for 7 days
    // dates that have input data
    meals.forEach((meal) =>
      graphDataArray.push({
        date: meal.date,
        meal: meal.meal,
        treat: meal.treat,
        avgCal: avgCal,
        idealCal: idealCal,
      })
    );
    // dates that don't have any input data
    noDataDates.forEach((date) =>
      graphDataArray.push({
        date: date,
        meal: 0,
        treat: 0,
        avgCal: avgCal,
        idealCal: idealCal,
      })
    );

    // order dates
    graphDataArray.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    // get rid of year e.g 2021-07-13 => 13
    let slicedDates = [];
    const sliceDate = () => {
      graphDataArray.forEach((meal) => {
        slicedDates.push({
          date: meal.date.slice(8, 10).split('-').join('/'),
          Meal: meal.meal,
          Treat: meal.treat,
          'Weekly Average': meal.avgCal,
          Ideal: meal.idealCal,
        });
      });
    };
    sliceDate();

    graphDataArray = slicedDates;

    setGraphData(graphDataArray);
  };

  useEffect(() => {
    getAllFoodDataForAWeek(allMeals);
    calcAvgCal(calcTotalDailyCalorie(allMealsForWeek));
  }, [allMeals, MER, avgCal, idealCal]);

  useEffect(() => {
    const setNewGraph = () => {
      let pastWeek;
      if (!firstTime) {
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
    <div className="meal-week-graph">
      {/* 確認用 */}
      {/*graphData.map((meal) => (
                <p key={meal.date}>{meal.date}, meal: {meal.meal}, treat: {meal.treat} avgCal: {meal.avgCal}</p>
            ))*/}
      <div className="week-controller">
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
            {week[6].split('-').join(' ')} to {week[0].split('-').join(' ')}
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
          <ComposedChart data={graphData} margin={{ right: 20, left: 0 }}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend wrapperStyle={{ bottom: -50, left: 20 }} />
            <Bar
              barSize={15}
              fillOpacity={1}
              dataKey="Meal"
              stackId="intake"
              fill="rgba(204, 171, 218, 0.7)"
              unit=" kcal"
            />
            <Bar
              barSize={15}
              fillOpacity={1}
              dataKey="Treat"
              stackId="intake"
              fill="rgba(59, 48, 84, 0.8)"
              unit=" kcal"
            />
            <Area
              type="monotone"
              dataKey="Weekly Average"
              stroke="rgba(59, 48, 84, 0.6)"
              fillOpacity={0}
              unit=" kcal"
            />
            <Area type="monotone" dataKey="Ideal" stroke="rgba(252, 136, 123, 1)" fillOpacity={0} unit=" kcal" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MealWeekChart;
