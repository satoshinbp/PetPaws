import { useState, useEffect } from 'react';
import Axios from 'axios';
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
import firebase from 'firebase/app'

const MealBar = () => {
    const [data, setData] = useState([])
    const [graphData, setGraphData] = useState([]);
    const [avgCal, setAvgCal] = useState([]);
    let newMeal = [];
    let allFoodData = []
    const fetchDate = (dayAgo) => {
        const date = new Date(new Date().setDate(new Date().getDate()-dayAgo)).toISOString().slice(0, 10)
        return date
    }
    let week = []; // for makeAvgCalArray() AND noDataDates

    // get dates for a week
    for(let i = 1; i < 8; i++) { 
        if (week.length < 7) {
            week.push(fetchDate(i))
        }
    }

    /*const getFoodCal = () => {
        for(let i = 0; i < 7; i++) { 
            const date = fetchDate(i)
            for(let y = 0; y < meals.length; y++) { 
                 // code to match firebase user token with DB will be needed
                // this needs to be modified a bit when DB is ready
                if(date == meals[y].date) {
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
    };*/

    // GET ALL FOOD DATA FOR A WEEK
    const getFoodData = (meals) => {
        for(let i = 0; i < 7; i++) { 
            const date = fetchDate(i)
            for(let y = 0; y < meals.length; y++) { 
                const mealDate = meals[y].date.slice(0, 10)
                if(date === mealDate) {
                    if(meals[y].type === 'Wet' || meals[y].type === 'Dry') {
                        const foodType = 'meal';
                        allFoodData.push(
                            {date: mealDate,
                            type: foodType,
                            meal: meals[y].calorie,
                            treat: 0}
                        );  
                    } else {
                        const foodType = 'treat'
                        allFoodData.push(
                            {date: mealDate,
                            type: foodType,
                            meal: 0,
                            treat: meals[y].calorie}
                        ); 
                    } 
                }
            }
        }
    }

    // SUM UP CALORIE FOR MEAL AND TREAT RESPECTIVELY PER DAY
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
            let dayCalorie = [];
            for (let prop in temp)
                dayCalorie.push(temp[prop]);
            return dayCalorie
    }

    // CALCULATE AVERAGE CALORIE PER DAY
    // INSERT AVERAGE CALORIE ANYWAY,
    // EVEN IF THERE WAS NO INPUT (FOR PURPOSE OF GRAPH)
    const getAvgCal = (meals) => {

        const avgCalc = () => {
            let sum = 0;

            // get totall calorie of a week
            for (let i = 0; i < meals.length; i++) {
                let sumCalorie = meals[i].meal + meals[i].treat
                sum = sum +  sumCalorie
            }

            // get average calorie of a day
            const averageCalorie = Math.round(sum / meals.length)
            setAvgCal(averageCalorie)
            return averageCalorie
        }
        avgCalc()
        
        
        const makeArrayForGraph = () => {

            let graphDataArray = []

            // get dates when there was no input in a day
            const noDataDates = week.filter((o1) => {
                // filter out (!) items in noDataDates2
                return !meals.some((o2) => {
                    if (o1 === o2.date) {
                        return o2
                    }     
                });
            })

            meals.forEach(meal => 
                graphDataArray.push({
                    date: meal.date,
                    meal: meal.meal,
                    treat: meal.treat,
                    avgCal: avgCalc()
                })
            )
            noDataDates.forEach(date => 
                graphDataArray.push({
                    date: date,
                    meal: 0,
                    treat: 0,
                    avgCal: avgCalc()
                })
            )
            setGraphData(graphDataArray)

        }
        
        makeArrayForGraph()

        
    };



    useEffect(() => {

        const getUid = async () => {
            const uid = await firebase.auth().currentUser.uid
            await Axios.get('http://localhost:3001/api/meal')
            .then((response) => {
                let weekData = []
                for(let i = 0; i < response.data.length; i++) {
                    if(response.data[i].uid == uid) {
                        weekData.push(response.data[i])
                    } 
                }
                getFoodData(weekData)
            }).then(() => {
              return sumUpCalorie(allFoodData)
            }).then((meals) => {
              getAvgCal(meals)
            })
            .catch((err) => {
              console.log(err)
            });

        }

        getUid()
        /*.then((response) => {
            const res = []
            for(let i = 0; i < response.data.length; i++) {
                if(uid == response.data[i].uid) {
                    res.push(response.data[i])
                }
            }
            setData(res)
            getFoodData(res)              
        })
        .then(() => {
            return sumUpCalorie(allFoodData)
        }).then((meals) => {
          getAvgCal(meals)
        })
        .catch((err) => {
          console.log(err)
        });*/



         /*Axios.get('http://localhost:3001/api/meal')
            .then((response) => {
              getFoodData(response.data)
            }).then(() => {
              return sumUpCalorie(allFoodData)
            }).then((meals) => {
              getAvgCal(meals)
            })
            .catch((err) => {
              console.log(err)
            });*/
 

    }, [])

    
    



    return (

        <div style={{height: '260px'}}> {/* MUST set height to display chart */}
            {/*testCal.map((item) => (
                <p>{item.date}</p>
            ))*/}
            <p>{avgCal}</p>
            {graphData.map((meal) => (
                <p key={meal.date}>{meal.date}, meal: {meal.meal}, treat: {meal.treat} avgCal: {meal.avgCal}</p>
            ))}


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
				data={graphData}
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
