import { useState, useEffect, useRef } from 'react';
import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const MealDayChart = ({ allMeals, MER }) => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [idealCalorie, setIdealCalorie] = useState('');
  const [mealsForDay, setMealsForDay] = useState([]); // each input on the date
  const [totalDailyCalorie, setTotalDailyCalorie] = useState(null); // combile meal and treat
  const colors = ['#86E3CE', 'rgba(252, 136, 123, 0.75)']; // left: intake, right: ideal bars colours
  let totalCal = 0;

  useEffect(() => {
    let allFood = [];
    for (let i = 0; i < allMeals.length; i++) {
      const activeDate = allMeals[i].date.slice(0, 10);
      if (date === activeDate) {
        allFood.push({
          name: allMeals[i].name,
          date: activeDate,
          time: allMeals[i].time.slice(0, 5),
          calorie: allMeals[i].calorie,
          type: allMeals[i].type,
          id: allMeals[i].id,
        });
      }
    }
    setMealsForDay(allFood);

    if (allFood.length > 0) {
      allFood.forEach((meal) => {
        totalCal = totalCal + meal.calorie;
      });
      setTotalDailyCalorie([
        { date: allFood[0].date, calorie: totalCal, label: 'intake' },
        { date: 'no-date' + 1, calorie: Math.floor(MER), label: 'ideal' },
      ]);
      setIdealCalorie({ date: 'intake', calorie: Math.floor(MER), label: 'ideal' });
    }
  }, [allMeals, date, totalCal, MER]);

  return (
    <div className="bg-secondary-fish">
      <div className="wrapper">
        <h2>Daily Meals</h2>
        <div className="bg-secondary-light meal-daily">
          <div className="info">
            <div className="date-picker">
              <label htmlFor="date">Choose a date:</label>
              <input
                type="date"
                id="date"
                name="meal-date"
                defaultValue={date}
                required
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            {totalDailyCalorie && date === totalDailyCalorie[0].date && (
              <div className="meal-daily-graph mobile" style={{ height: '180px' }}>
                {/* height is necessary to display graph */}
                <ResponsiveContainer>
                  <ComposedChart
                    layout="vertical"
                    data={totalDailyCalorie}
                    margin={{ top: 20, right: 20, bottom: 0, left: 25 }}
                  >
                    <XAxis type="number" domain={[0, 'dataMax']} dataKey="calorie" stroke="#3B3054" />
                    <YAxis type="category" dataKey="label" stroke="#3B3054" />
                    <Tooltip /> {/* values shown when hovered */}
                    <Bar dataKey="calorie" barSize={20} fillOpacity={1}>
                      {totalDailyCalorie.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                      ))}
                    </Bar>
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            )}
            {mealsForDay.length > 0 ? (
              <div className="daily-list">
                <p>{mealsForDay[0].date.split('-').join('/')}</p>
                {mealsForDay.map((meal) => (
                  <div className="list-item">
                    <p key={meal.id}>Name:&nbsp;{meal.name}</p>
                    <p key={meal.id}>
                      Time:&nbsp;
                      {meal.time}
                    </p>
                    <p key={meal.id}>Type:&nbsp;{meal.type}</p>
                    <p>Calorie:&nbsp;{meal.calorie} kcal</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No meal is added</p>
            )}
          </div>

          {totalDailyCalorie && date === totalDailyCalorie[0].date && (
            <div className="meal-daily-graph desktop" style={{ height: '150px' }}>
              {/* height is necessary to display graph */}
              <ResponsiveContainer>
                <ComposedChart
                  layout="vertical"
                  data={totalDailyCalorie}
                  margin={{ top: 20, right: 20, bottom: 0, left: 25 }}
                >
                  <XAxis type="number" domain={[0, 'dataMax']} dataKey="calorie" stroke="#3B3054" />
                  <YAxis type="category" dataKey="label" stroke="#3B3054" />
                  <Tooltip /> {/* values shown when hovered */}
                  <Bar dataKey="calorie" barSize={20} fillOpacity={1}>
                    {totalDailyCalorie.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                  </Bar>
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealDayChart;
