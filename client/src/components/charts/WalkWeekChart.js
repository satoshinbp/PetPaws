import {
    ResponsiveContainer,
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Area
} from "recharts";

const WalkWeekChart = ({graphData, test}) => {

    return (

        <div style={{height: '260px'}}> {/* MUST set height to display chart */}
                    <h2>Walk Graph</h2>
            {/*testCal.map((item) => (
                <p>{item.date}</p>
            ))*/}
            {/* 確認用 */}
            {/*graphData.map((meal) => (
                <p key={meal.date}>{meal.date}, minute: {meal.minute}, distance: {meal.distance} avgMin: {meal.avgMin}</p>
            ))*/}
            <br></br>



            <ResponsiveContainer>
            <ComposedChart 
                data={graphData} 
                margin={{left: 0 }}          
            >

            <XAxis
                dataKey="date"  
            />
            <YAxis />
            <Tooltip /> 
            <Legend />  
            <CartesianGrid 
                stroke="#f5f5f5" 
            />
            <Area 
                type="monotone"  
                dataKey="avgMin" 
                stroke="#00aced" 
                fillOpacity={.3}  
                fill="rgba(0, 172, 237, 0.2)"  
            />
            <Bar                
                barSize={15}  
                fillOpacity={1}  
                fill="#2250A2" 
                dataKey="minute" stackId="a" barSize={15} fill="#85d6c3" 
            />

            </ComposedChart>
            </ResponsiveContainer>

        
            
        </div>
    )
}

export default WalkWeekChart;
