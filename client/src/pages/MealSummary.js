import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import firebase from 'firebase/app'
import MealWeekChart from '../components/charts/MealWeekChart';
import MealDayChart from '../components/charts/MealDayChart';


  

const MealSummary = () => {
    const [data, setData] = useState([])
    const [weekData, setWeekData] = useState([])
    const [graphData, setGraphData] = useState([]);
    const [avgCal, setAvgCal] = useState([]);
    const [test, setTest] = useState([])
    let newMeal = [];
    let allFoodData = []
    const fetchDate = (dayAgo) => {
        return new Date(new Date().setDate(new Date().getDate()-dayAgo)).toISOString().slice(0, 10)
        
    }
    let week = []; // for makeAvgCalArray() AND noDataDates

    // get dates for a week
    for(let i = 0; i < 7; i++) { 
        if (week.length < 7) {
            week.push(fetchDate(i))
        }
    }
    /* for daily calorie graph   */
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [dateData, setDateData] = useState([]) // each input on the date
    const [sumDateData, setSumDateData] = useState([]) // combile meal and treat

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


        let sum = 0;

        // get totall calorie of a week
        for (let i = 0; i < meals.length; i++) {
            let sumCalorie = meals[i].meal + meals[i].treat
            sum = sum +  sumCalorie
        }

        // get average calorie of a day
        const averageCalorie = Math.round(sum / meals.length)
        setAvgCal(averageCalorie)

    


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
                avgCal: averageCalorie
            })
        )
        noDataDates.forEach(date => 
            graphDataArray.push({
                date: date,
                meal: 0,
                treat: 0,
                avgCal: averageCalorie
            })
        )

        graphDataArray.sort(function(a, b){
            return new Date(b.date) - new Date(a.date);
        });

        setGraphData(graphDataArray)


        
    };



    useEffect(() => {

        const getUid = async () => {
            const uid = await firebase.auth().currentUser.uid
            await Axios.get('http://localhost:3001/api/meal')
            .then((response) => {
                let userData = []
                for(let i = 0; i < response.data.length; i++) {
                    if(response.data[i].uid === uid) {
                        userData.push(response.data[i])
                    } 
                }
                setData(userData)
                getFoodData(userData)
            }).then(() => {
                setWeekData(allFoodData)
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

    useEffect(() => {
        let allFood = []

        for(let i = 0; i < data.length; i++) {
            const dataDate = data[i].date.slice(0, 10)
            if(date === dataDate) {
                //setDateData((meal) => ({...meal, date: data[i].data}))
                allFood.push({
                    date: dataDate,
                    time: data[i].time.slice(0, 5),
                    calorie: data[i].calorie,
                    type: data[i].type,
                })
            }
        }
        setDateData(allFood)
        let totallCal = 0

        allFood.forEach((meal) => {
            console.log(meal.calorie)
            totallCal = totallCal +  meal.calorie
        })

            console.log(totallCal)

        if(allFood.length > 1) {
            setSumDateData([{
                date: allFood[0].date,
                calorie: totallCal
            }])
        }

    }, [date])


    

    return (
        <div>
            <h2>Meal Tracker</h2>
            <Link to="/createmeal">Add Meal</Link>
            <MealDayChart dateData={dateData} sumDateData={sumDateData} date={date} onChange={(e) => {setDate(e.target.value)}}/>
            <MealWeekChart graphData={graphData} test={weekData}/>

            
        </div>
        
    )
}

export default MealSummary;
