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

const MealWeekChart = ({graphData, test}) => {

    return (

        <div style={{height: '260px'}}> {/* MUST set height to display chart */}
            {/*testCal.map((item) => (
                <p>{item.date}</p>
            ))*/}
            {/* 確認用 */}
            {/*graphData.map((meal) => (
                <p key={meal.date}>{meal.date}, meal: {meal.meal}, treat: {meal.treat} avgCal: {meal.avgCal}</p>
            ))*/}
            <br></br>
            {/*test.map((meal) => ( 
                <p key={meal.date}>{meal.date}, meal: {meal.meal}, treat: {meal.treat} avgCal: {meal.avgCal}</p>
            ))*/}


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
                dataKey="avgCal" 
                stroke="#00aced" 
                fillOpacity={.3}  
                fill="rgba(0, 172, 237, 0.2)"  
            />
            <Bar 
                barSize={15}  
                fillOpacity={1}  
                dataKey="meal" 
                stackId="intake" 
                fill="#85d6c3" 
            />
            <Bar 
                barSize={15}  
                fillOpacity={1}  
                dataKey="treat" 
                stackId="intake" 
                fill="#363869" 
            />

            </ComposedChart>
            </ResponsiveContainer>

            

            {/*<ResponsiveContainer>
            <BarChart
				width={500}
				height={300}
				data={test}
                margin={{left: 0 }}  // to get rid of extra space 
			>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="meal" stackId="a" barSize={15} fill="#85d6c3" />
                <Bar dataKey="treat" stackId="a" barSize={15} fill="#363869" />
			</BarChart>
            </ResponsiveContainer>*/}

            
        </div>
    )
}

export default MealWeekChart;
