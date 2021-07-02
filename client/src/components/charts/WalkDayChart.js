/*import {
    ResponsiveContainer,
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";*/

const WalkDayChart = ({dateData, sumDateData, date, onChange}) => {

    return (
        <div style={{border: "1px solid"}}>{/* temporary styling */}
            <h2>Walk Day Chart</h2>
            {dateData.length > 0 ? (
                dateData.map((meal) => ( 
                    <p key={meal.id}>Date:&nbsp;{meal.date}&nbsp;&nbsp;&nbsp;
                    Duratinon:&nbsp;{meal.minute} min&nbsp;&nbsp;&nbsp;
                    Distance:&nbsp;{meal.distance ? (meal.distance + 'km'): ('no data')}
                    </p>
                ))
            ) : (
                <p>No activity is added</p>
            )}
            <input
                type="date"
                id="walk-date"
                name="walk-date"
                defaultValue={date}
                required
                onChange={onChange}
            />
            


            {/*((sumDateData[0]) && date === sumDateData[0].date) ? (
             <div style={{height: '150px'}} >
                <ResponsiveContainer>
                    <ComposedChart
                        layout="vertical" 
                        data={sumDateData} 
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
                    <Tooltip />
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
            )*/}
            
            
        </div>
    )
}

export default WalkDayChart
