import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import firebase from 'firebase/app'
import WalkWeekChart from '../components/charts/WalkWeekChart';
import WalkDayChart from '../components/charts/WalkDayChart';


  

const WalkSummary = () => {
    const [data, setData] = useState([])
    const [weekData, setWeekData] = useState([])
    const [graphData, setGraphData] = useState([]);
    const [avgMin, setAvgMin] = useState([]);
    const [test, setTest] = useState([])
    let newMeal = [];
    let allFoodData = []
    let allWalkData = []
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
    const getWalkData = (walk) => {
        for(let i = 0; i < 7; i++) { 
            const date = fetchDate(i)
            for(let y = 0; y < walk.length; y++) { 
                const mealDate = walk[y].date.slice(0, 10)
                if(date === mealDate) {
                    allWalkData.push({
                        date: mealDate,
                        minute: walk[y].minute,
                        distance: walk[y].distance,
                        name: walk[y].name
                    })
                }
            }
        }
    }

    // SUM UP DISTANCE AND MINUTE RESPECTIVELY PER DAY
    const sumUpTime = (walk) => {
        let temp = {};
            let obj = null;
            for(let j=0; j < walk.length; j++) {
               obj=walk[j];
            
               if(!temp[obj.date]) {
                   temp[obj.date] = obj;
               } else {
                   temp[obj.date].minute += obj.minute;
                   temp[obj.date].distance += obj.distance;
               }
            }
            let sumWalk = [];
            for (let prop in temp)
                sumWalk.push({
                    name: temp[prop].name,
                    date: temp[prop].date,
                    minute: temp[prop].minute,
                    distance: (Math.round(temp[prop].distance * 10) / 10)
                });
                console.log(sumWalk)
            return sumWalk
    }

    // CALCULATE AVERAGE CALORIE PER DAY
    // INSERT AVERAGE CALORIE ANYWAY,
    // EVEN IF THERE WAS NO INPUT (FOR PURPOSE OF GRAPH)
    const getAvgWalk = (walks) => {


        let sum = 0;

        // get totall calorie of a week
        for (let i = 0; i < walks.length; i++) {
            sum = sum +  walks[i].minute
        } 

        // get average calorie of a day
        const averageTime = Math.round(sum / walks.length)
        setAvgMin(averageTime)


        let graphDataArray = []

        // get dates when there was no input in a day
        const noDataDates = week.filter((o1) => {
            // filter out (!) items in noDataDates2
            return !walks.some((o2) => {
                if (o1 === o2.date) {
                    return o2
                }     
            });
        })
        console.log(walks)
        walks.forEach(walk => 
            graphDataArray.push({
                date: walk.date,
                minute: walk.minute,
                distance: walk.distance,
                avgMin: averageTime,
            })
        )
        noDataDates.forEach(walk => 
            graphDataArray.push({
                date: walk,
                minute: 0,
                distance: 0,
                avgMin: averageTime,
            })
        )

        graphDataArray.sort(function(a, b){
            return new Date(b.date) - new Date(a.date);
        });

        console.log(graphDataArray)

        setGraphData(graphDataArray)


        
    };



    useEffect(() => {

        const getUid = async () => {
            const uid = await firebase.auth().currentUser.uid
            await Axios.get('http://localhost:3001/api/activity')
            .then((response) => {
                let userData = []
                for(let i = 0; i < response.data.length; i++) {
                    if(response.data[i].uid === uid) {
                        userData.push(response.data[i])
                    } 
                }
                setData(userData)
                getWalkData(userData)
            }).then(() => {
                console.log(allWalkData)
                setWeekData(allWalkData)
              return sumUpTime(allWalkData)
            }).then((meals) => {
              getAvgWalk(meals)
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
            getWalkData(res)              
        })
        .then(() => {
            return sumUpTime(allFoodData)
        }).then((meals) => {
          getAvgWalk(meals)
        })
        .catch((err) => {
          console.log(err)
        });*/



         /*Axios.get('http://localhost:3001/api/meal')
            .then((response) => {
              getWalkData(response.data)
            }).then(() => {
              return sumUpTime(allFoodData)
            }).then((meals) => {
              getAvgWalk(meals)
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
            <Link to="/createwalk">Add Activity</Link>
            {/*<WalkDayChart dateData={dateData} sumDateData={sumDateData} date={date} onChange={(e) => {setDate(e.target.value)}}/>*/}
            <p>walk</p>
            <WalkWeekChart graphData={graphData} test={weekData}/>

            
        </div>
        
    )
}

export default WalkSummary;
