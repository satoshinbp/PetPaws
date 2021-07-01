import {
    ResponsiveContainer,
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

const MealDayChart = ({dateData, sumDateData, date, onChange}) => {

    return (
        <div style={{border: "1px solid"}}>{/* temporary styling */}
            <h2>Meal Day Chart</h2>
            {dateData.map((meal) => ( 
                <p>Date:&nbsp;{meal.date}&nbsp;&nbsp;&nbsp;
                   Type:&nbsp;{meal.type}&nbsp;&nbsp;&nbsp;
                   Calorie:&nbsp;{meal.calorie}
                </p>
            ))}
            <input
                type="date"
                id="date"
                name="meal-date"
                defaultValue={date}
                required
                onChange={onChange}
            />
            


            {((sumDateData[0]) && date === sumDateData[0].date) ? (
             <div style={{height: '150px'}}>{/* height is necessary to display graph */}
                <ResponsiveContainer>
                    <ComposedChart
                        layout="vertical" // vertical bar chart
                        data={sumDateData}   // data array
                        margin={{ top: 20, right: 20, bottom: 0, left: 25 }}  //marginを指定
                    >
                    <XAxis 
                        type="number"
                        domain={[0, 'dataMax']} // range of values in the graph
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
            ) : (
                <p>No data is found</p>
            )}
            
            
        </div>
    )
}

export default MealDayChart
