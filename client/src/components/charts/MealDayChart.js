import { useState, useEffect } from 'react';
import {
    ResponsiveContainer,
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

const MealDayChart = ({data}) => {

    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [dateData, setDateData] = useState([]) // each input on the date
    const [sumDateData, setSumDateData] = useState(null) // combile meal and treat


    useEffect(() => {
        let allFood = []
        for(let i = 0; i < data.length; i++) {
            const dataDate = data[i].date.slice(0, 10)
            if(date === dataDate) {
                allFood.push({
                    date: dataDate,
                    time: data[i].time.slice(0, 5),
                    calorie: data[i].calorie,
                    type: data[i].type,
                })
            }
        }
        setDateData(allFood)

        if (allFood.length > 0) {
            let totallCal = 0;
            allFood.forEach((meal) => {
              console.log(meal.calorie);
              totallCal = totallCal + meal.calorie;
            });
            setSumDateData({ date: allFood[0].date, calorie: totallCal });
        }

    }, [date])

    return (
        <div style={{border: "1px solid"}}>{/* temporary styling */}
            <h2>Meal Day Chart</h2>
            {(dateData.length > 0) ? (
                dateData.map((meal) => ( 
                    <p>Date:&nbsp;{meal.date}&nbsp;&nbsp;&nbsp;
                       Type:&nbsp;{meal.type}&nbsp;&nbsp;&nbsp;
                       Calorie:&nbsp;{meal.calorie}
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
            


            {date === sumDateData?.date &&  (
             <div style={{height: '150px'}}>{/* height is necessary to display graph */}
                <ResponsiveContainer>
                    <ComposedChart
                        layout="vertical"
                        data={[sumDateData]} 
                        margin={{ top: 20, right: 20, bottom: 0, left: 25 }} 
                    >
                    <XAxis 
                        type="number"
                        domain={[0, 'dataMax']} 
                        dataKey="calorie"
                    />
                    <YAxis 
                        type="category"
                        dataKey="date"
                    />
                    <Tooltip /> {/* values shown when hovered */}
                    <Bar
                        dataKey="calorie"
                        barSize={20}
                        stroke="rgba(34, 80, 162, 0.2)"
                        fillOpacity={1}
                        fill="#2250A2"
                    />
                </ComposedChart>
            </ResponsiveContainer>
            </div>
            )}
            
            
        </div>
    )
}

export default MealDayChart
