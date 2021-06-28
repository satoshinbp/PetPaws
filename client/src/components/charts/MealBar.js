import { useState, useEffect } from 'react';
import meals from './mealData';
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

const MealBar = () => {
    const [foodCal, setFoodCal] = useState([]);
    const [avgCal, setAvgCal] = useState([]);
    const [weekData, setWeekData] = useState([]);
    let newMeal = [];
    let week = [];

    const getFoodCal = () => {
        for(let i = 0; i < 7; i++) { 
            const getDate = new Date(new Date().setDate(new Date().getDate()-i)).toISOString().slice(0, 10)
            for(let y = 0; y < meals.length; y++) { 
                 // code to match firebase user token with DB will be needed
                // this needs to be modified a bit when DB is ready
                if(getDate == meals[y].date) {
                    console.log(meals[y])
                    if(meals[y].type === 'Wet' || meals[y].type === 'Dry') {
                        const foodType = 'meal';
                        newMeal.push(
                            {date: meals[y].date,
                            type: foodType,
                            meal: meals[y].calorie,
                            treat: null}
                        );  
                    } else {
                        const foodType = 'treat'
                        newMeal.push(
                            {date: meals[y].date,
                            type: foodType,
                            meal: null,
                            treat: meals[y].calorie}
                        );  
                    }; 
                };
            };
        };
    };

    // sum up calories from meal and treat respectively if there are duplicated dates.
    const sumUpCalorie = (meals) => {
        let temp = {};
            let obj = null;
            for(let j=0; j < meals.length; j++) {
               obj=meals[j];
            
               if(!temp[obj.date]) {
                   temp[obj.date] = obj;
               } else {
                   temp[obj.date].meal += obj.meal;
                   temp[obj.date].treat += obj.treat;
               }
            }
            let result = [];
            for (let prop in temp)
                result.push(temp[prop]);
            return result
    }


    const getAvgCalrie = (meals) => {
        let sum = 0;
        let calContainer = []; 
        for(let i = 0; i < 7; i++) { 
            const getDate = new Date(new Date().setDate(new Date().getDate()-i)).toISOString().slice(0, 10)
            week.push(getDate)
        }

        for (let i = 0; i < meals.length; i++) {
            let sumCalorie = meals[i].meal + meals[i].treat
            sum = sum +  sumCalorie
        }

        const averageCalorie = Math.round(sum / meals.length)

        for(let i = 0; i < 7; i++) {
            calContainer.push({
                date: week[i], calorie: averageCalorie
            })
        }
        setAvgCal(calContainer);


        console.log(week)

        const insertAvgCal = () => {
            const noDataDate = 7 - meals.length
            let graphArray = meals
            /*for(let i = 0; i < noDateDate; i++) {
                graphArray.push({date: })
            }*/
        }

        insertAvgCal()

        /*let week = []
        for(let i = 0; i < 7; i++) { 
            const getDate = new Date(new Date().setDate(new Date().getDate()-i)).toISOString().slice(0, 10)
            week.push(getDate)
        }*/
        var props = ['date', 'date'];

        var result = week.filter(function(o1){
            // filter out (!) items in result2
            return !meals.some(function(o2){
                if (o1 === o2.date) {
                    return o2
                }         // working
            });
        })/*.map(function(o){
            console.log(o)
            // use reduce to make objects with only the required properties
            // and map to apply this to the filtered array as a whole
            return {...result, meal}
        });*/
        const makeArrayForGraph = () => {
            let graphData = []
            meals.forEach(meal => 
                graphData.push({
                    date: meal.date,
                    meal: meal.meal,
                    treat: meal.treat,
                    avgCal: averageCalorie
                })
            )
            result.forEach(date => 
                graphData.push({
                    date: date,
                    meal: 0,
                    treat: 0,
                    avgCal: averageCalorie
                })
            )
            console.log(graphData)
            setFoodCal(graphData)

        }
        makeArrayForGraph()


        //
        /*var result1 = [
    {id:1, name:'Sandra', type:'user', username:'sandra'},
    {id:2, name:'John', type:'admin', username:'johnny2'},
    {id:3, name:'Peter', type:'user', username:'pete'},
    {id:4, name:'Bobby', type:'user', username:'be_bob'}
];

var result2 = [
    {id:2, name:'John', email:'johnny@example.com'},
    {id:4, name:'Bobby', email:'bobby@example.com'}
];

var props = ['id', 'name'];

var result = result1.filter(function(o1){
    // filter out (!) items in result2
    return !result2.some(function(o2){
        return o1.id === o2.id;          // assumes unique id
    });
}).map(function(o){
    console.log(o)
    // use reduce to make objects with only the required properties
    // and map to apply this to the filtered array as a whole
    return props.reduce(function(newo, name){
        newo[name] = o[name];
        return newo;
    }, {});
});

console.log(result)*/

        
    };


    useEffect(() => {


        //getFoodCal();
        getFoodCal()


        // this will get properly conneted with async when DB is ready
        //sumUpCalorie(newMeal)
        getAvgCalrie(sumUpCalorie(newMeal))
        /*newMeal = []
        getFoodCal()
        getAvgCalrie(sumUpCalorie(newMeal));
        console.log(getAvgCalrie(sumUpCalorie(newMeal)))*/
        



    }, [])

    
    



    return (

        <div style={{height: '260px'}}> {/* MUST set height to display chart */}
            {foodCal.map((meal) => (
                <p>{meal.date}, meal: {meal.meal}, treat: {meal.treat} avgCal: {meal.avgCal}</p>
            ))}

            <ResponsiveContainer>
            <ComposedChart //グラフ全体のサイズや位置、データを指定。場合によってmarginで上下左右の位置を指定する必要あり。
                data={foodCal} //ここにArray型のデータを指定
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
                dataKey="avgCal" //Array型のデータの、Y軸に表示したい値のキーを指定
                stroke="#00aced" ////グラフの線の色を指定
                fillOpacity={.3}  ////グラフの中身の薄さを指定
                fill="rgba(0, 172, 237, 0.2)"  //グラフの色を指定
            />
            <Bar //棒グラフ
                　//Array型のデータの、Y軸に表示したい値のキーを指定
                barSize={15}  //棒の太さを指定
                fillOpacity={1}  //レーダーの中身の色の薄さを指定
                fill="#2250A2" ////レーダーの中身の色を指定
                dataKey="meal" stackId="a" barSize={15} fill="#85d6c3" 
            />
            <Bar //棒グラフ
                　//Array型のデータの、Y軸に表示したい値のキーを指定
                barSize={15}  //棒の太さを指定
                stroke="#363869" ////レーダーの線の色を指定 
                fillOpacity={1}  //レーダーの中身の色の薄さを指定
                fill="#2250A2" ////レーダーの中身の色を指定
                dataKey="treat" stackId="a" barSize={15} fill="#363869" 
            />

            </ComposedChart>
            </ResponsiveContainer>

            

            <ResponsiveContainer>
            <BarChart
				width={500}
				height={300}
				data={foodCal}
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

export default MealBar;
