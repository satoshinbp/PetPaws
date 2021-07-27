import { useState, useEffect, useRef } from 'react';
import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import format from 'date-fns/format';

const MealDayChart = ({ allMeals, MER }) => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [idealCalorie, setIdealCalorie] = useState('');
  const [mealsForDay, setMealsForDay] = useState([]); // each input on the date
  const [totalDailyCalorie, setTotalDailyCalorie] = useState(null); // combile meal and treat
  const [dateToDisplay, setDateToDisplay] = useState(null);
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
        { date: allFood[0].date, calorie: totalCal, label: 'Intake' },
        { date: 'no-date' + 1, calorie: Math.floor(MER), label: 'Ideal' },
      ]);
      setIdealCalorie({ date: 'intake', calorie: Math.floor(MER), label: 'ideal' });
      // format time to display in the daily meal list
      const rawDateData = new Date(allFood[0].date + 'T00:00'); // avoid getting a wrong date by setting time
      const formattedDate = format(rawDateData, 'dd-MMMM-yyyy');
      setDateToDisplay(formattedDate.replace('-', ' ').replace('-', ', '));
    }
  }, [allMeals, date, totalCal, MER, dateToDisplay]);

  return (
    <div className="bg-secondary-fish">
      <div className="wrapper">
        <h2>Daily Meals</h2>
        <div className="bg-secondary-light meal-daily">
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
          {!(mealsForDay.length > 0) && <p className="warning">No meal is added on the day</p>}
          <div className="info">
            {totalDailyCalorie && date === totalDailyCalorie[0].date && (
              <div className="meal-daily-graph mobile" style={{ height: '180px' }}>
                {/* height is necessary to display graph */}
                <ResponsiveContainer>
                  <ComposedChart
                    layout="vertical"
                    data={totalDailyCalorie}
                    margin={{ top: 20, right: 20, bottom: 0, left: 25 }}
                  >
                    <XAxis type="number" domain={[0, 'dataMax']} dataKey="calorie" />
                    <YAxis type="category" dataKey="label" />
                    <Tooltip /> {/* values shown when hovered */}
                    <Bar dataKey="calorie" barSize={20} fillOpacity={1} unit=" kcal">
                      {totalDailyCalorie.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                      ))}
                    </Bar>
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            )}
            {mealsForDay.length > 0 && (
              <div className="daily-list">
                <p>{dateToDisplay}</p>
                {mealsForDay.map((meal) => (
                  <div className="list-item" key={meal.id}>
                    <p>Name:&nbsp;{meal.name},</p>
                    <p>
                      Time:&nbsp;
                      {meal.time},
                    </p>
                    <p>Type:&nbsp;{meal.type},</p>
                    <p>Calorie:&nbsp;{meal.calorie} kcal</p>
                  </div>
                ))}
              </div>
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
                  <Bar dataKey="calorie" barSize={20} fillOpacity={1} unit=" kcal">
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
