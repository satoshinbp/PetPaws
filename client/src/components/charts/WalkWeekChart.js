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

const WalkWeekChart = ({graphData, test}) => {

    return (

        <div style={{height: '260px'}}> {/* MUST set height to display chart */}
                    <h2>Walk Graph</h2>
            {/*testCal.map((item) => (
                <p>{item.date}</p>
            ))*/}
            {graphData.map((meal) => (
                <p key={meal.date}>{meal.date}, minute: {meal.minute}, distance: {meal.distance} avgMin: {meal.avgMin}</p>
            ))}
            <br></br>



            <ResponsiveContainer>
            <ComposedChart //グラフ全体のサイズや位置、データを指定。場合によってmarginで上下左右の位置を指定する必要あり。
                data={graphData} //ここにArray型のデータを指定
                margin={{left: 0 }}  // to get rid of extra space          
            >

            <XAxis
                dataKey="date"  //Array型のデータの、X軸に表示したい値のキーを指定
            />
            <YAxis />
            <Tooltip /> //hoverした時に各パラメーターの詳細を見れるように設定 
            <Legend />  // 凡例を表示(図の【売上】【総売上】)
            <CartesianGrid //グラフのグリッドを指定
                stroke="#f5f5f5" //グリッド線の色を指定
            />
            <Area //面積を表すグラフ
                type="monotone"  //グラフが曲線を描くように指定。default値は折れ線グラフ
                dataKey="avgMin" //Array型のデータの、Y軸に表示したい値のキーを指定
                stroke="#00aced" ////グラフの線の色を指定
                fillOpacity={.3}  ////グラフの中身の薄さを指定
                fill="rgba(0, 172, 237, 0.2)"  //グラフの色を指定
            />
            <Bar //棒グラフ
                　//Array型のデータの、Y軸に表示したい値のキーを指定
                barSize={15}  //棒の太さを指定
                fillOpacity={1}  //レーダーの中身の色の薄さを指定
                fill="#2250A2" ////レーダーの中身の色を指定
                dataKey="minute" stackId="a" barSize={15} fill="#85d6c3" 
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

            <ResponsiveContainer>
            <ComposedChart //グラフ全体のサイズや位置、データを指定。場合によってmarginで上下左右の位置を指定する必要あり。
                data={test} //ここにArray型のデータを指定
                margin={{left: 0 }}  // to get rid of extra space          
            >

            <XAxis
                dataKey="date"  //Array型のデータの、X軸に表示したい値のキーを指定
            />
            <YAxis />
            <Tooltip /> 
            <Legend />
            <CartesianGrid //グラフのグリッドを指定
                stroke="#f5f5f5" //グリッド線の色を指定
            />
            <Bar //棒グラフ
                　//Array型のデータの、Y軸に表示したい値のキーを指定
                barSize={15}  //棒の太さを指定
                fillOpacity={1}  //レーダーの中身の色の薄さを指定
                fill="#2250A2" ////レーダーの中身の色を指定
                dataKey="meal" stackId="a" barSize={15} fill="#85d6c3" 
            />

            </ComposedChart>
            </ResponsiveContainer>
            
        </div>
    )
}

export default WalkWeekChart;
