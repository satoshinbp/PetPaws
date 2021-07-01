import {
    ResponsiveContainer,
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Area
} from "recharts";

const MealWeekChart = ({graphData, test}) => {

    return (

        <div style={{height: '260px'}}> {/* MUST set height to display chart */}
            {/*testCal.map((item) => (
                <p>{item.date}</p>
            ))*/}
            {graphData.map((meal) => (
                <p key={meal.date}>{meal.date}, meal: {meal.meal}, treat: {meal.treat} avgCal: {meal.avgCal}</p>
            ))}
            <br></br>
            {test.map((meal) => ( 
                <p key={meal.date}>{meal.date}, meal: {meal.meal}, treat: {meal.treat} avgCal: {meal.avgCal}</p>
            ))}


            <ResponsiveContainer>
            <ComposedChart 
                data={graphData} // data array
                margin={{left: 0 }}  // to get rid of extra space          
            >

            <XAxis
                dataKey="date" 
            />
            <YAxis />
            <Tooltip />  
            <Legend />
            <CartesianGrid // grid in the graph
                stroke="#f5f5f5" 
            />
            <Area // ideal calorie
                type="monotone"  // smooth line in the graph
                dataKey="avgCal" 
                stroke="#00aced" 
                fillOpacity={.3}  
                fill="rgba(0, 172, 237, 0.2)"  
            />
            <Bar 
                barSize={15}  // thickness
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

            

            <ResponsiveContainer>
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
            {/*<Area //面積を表すグラフ
                type="monotone"  //グラフが曲線を描くように指定。default値は折れ線グラフ
                dataKey="avgCal" //Array型のデータの、Y軸に表示したい値のキーを指定
                stroke="#00aced" ////グラフの線の色を指定
                fillOpacity={1}  ////グラフの中身の薄さを指定
                fill="rgba(0, 172, 237, 0.2)"  //グラフの色を指定
            />*/}
            </ResponsiveContainer>

            
        </div>
    )
}

export default MealWeekChart;
