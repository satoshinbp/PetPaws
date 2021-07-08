import { useState, useEffect } from 'react';
import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const MealDayChart = ({ allMeals }) => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [mealsForDay, setMealsForDay] = useState([]); // each input on the date
  const [totalDailyCalorie, setTotalDailyCalorie] = useState(null); // combile meal and treat

  useEffect(() => {
    let allFood = [];
    for (let i = 0; i < allMeals.length; i++) {
      const activeDate = allMeals[i].date.slice(0, 10);
      if (date === activeDate) {
        allFood.push({
          date: activeDate,
          time: allMeals[i].time.slice(0, 5),
          calorie: allMeals[i].calorie,
          type: allMeals[i].type,
        });
      }
    }
    setMealsForDay(allFood);

    if (allFood.length > 0) {
      let totallCal = 0;
      allFood.forEach((meal) => {
        totallCal = totallCal + meal.calorie;
      });
      setTotalDailyCalorie({ date: allFood[0].date, calorie: totallCal });
    }
  }, [date]);

  return (
    <div style={{ border: '1px solid' }}>
      {/* temporary styling */}
      <h2>Meal Day Chart</h2>
      {mealsForDay.length > 0 ? (
        mealsForDay.map((meal) => (
          <p>
            Date:&nbsp;{meal.date}&nbsp;&nbsp;&nbsp; Type:&nbsp;{meal.type}&nbsp;&nbsp;&nbsp; Calorie:&nbsp;
            {meal.calorie}
          </p>
        ))
      ) : (
        <p>No meal is added</p>
      )}

      <input
        type="date"
        id="date"
        name="meal-date"
        defaultValue={date}
        required
        onChange={(e) => setDate(e.target.value)}
      />

      {date === totalDailyCalorie?.date && (
        <div style={{ height: '150px' }}>
          {/* height is necessary to display graph */}
          <ResponsiveContainer>
            <ComposedChart
              layout="vertical"
              data={[totalDailyCalorie]}
              margin={{ top: 20, right: 20, bottom: 0, left: 25 }}
            >
              <XAxis type="number" domain={[0, 'dataMax']} dataKey="calorie" />
              <YAxis type="category" dataKey="date" />
              <Tooltip /> {/* values shown when hovered */}
              <Bar dataKey="calorie" barSize={20} stroke="rgba(34, 80, 162, 0.2)" fillOpacity={1} fill="#2250A2" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default MealDayChart;
