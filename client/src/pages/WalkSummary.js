import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import WalkWeekChart from '../components/charts/WalkWeekChart';
import WalkDayChart from '../components/charts/WalkDayChart';


  

const WalkSummary = () => {
    const getWeek = (startDay, endDay) => {
        let tempWeek = []
        for(let i = startDay; i < endDay; i++) { 
            tempWeek.push(new Date(new Date().setDate(new Date().getDate()-i)).toISOString().slice(0, 10)) 
        }
        return tempWeek
    }
    const [week, setWeek] = useState(getWeek(0,7))
    const [data, setData] = useState([])
    const [weekData, setWeekData] = useState([])
    const [graphData, setGraphData] = useState([]);
    const [avgMin, setAvgMin] = useState([]);
    let allWalkData = []
    /* for daily calorie graph   */
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [dateData, setDateData] = useState([]) // each input on the date
    const [sumDateData, setSumDateData] = useState(null) // combile meal and treat
    const [count, setCount] = useState(0);
    const [firstTime, setFirstTime] = useState(true)
    const { currentUser } = useAuth();

    // GET ALL FOOD DATA FOR A WEEK
    const getWalkData = (walk) => {
        for(let i = 0; i < 7; i++) { 
            const date = week[i]
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
        walks.forEach(walk => 
            graphDataArray.push({
                date: walk.date,
                minute: walk.minute,
                distance: walk.distance,
                avgMin: avgMin,
            })
        )
        noDataDates.forEach(walk => 
            graphDataArray.push({
                date: walk,
                minute: 0,
                distance: 0,
                avgMin: avgMin,
            })
        )

        graphDataArray.sort(function(a, b){
            return new Date(b.date) - new Date(a.date);
        });

        setGraphData(graphDataArray)


        
    };



    useEffect(() => {

        const getUid = async () => {
            const uid = currentUser.uid;
            await Axios.get('http://localhost:3001/api/activity')
            .then((response) => {
                let userData = []
                response.data.filter((meal) => meal.uid === uid).forEach((meal) => userData.push(meal));
                setData(userData)
                getWalkData(data)
                setWeekData(allWalkData)
                const meals = sumUpTime(allWalkData)
                getAvgWalk(meals)
            }).catch((err) => {
              console.log(err)
            });
            

        }

        getUid()
 

    }, [avgMin])

    useEffect(() => {
        let allWalk = []

        for(let i = 0; i < data.length; i++) {
            const dataDate = data[i].date.slice(0, 10)
            if(date === dataDate) {
                //setDateData((meal) => ({...meal, date: data[i].data}))
                allWalk.push({
                    id: data[i].id,
                    date: dataDate,
                    minute: data[i].minute,
                    distance: data[i].distance,
                    name: data[i].name,
                })
            }
        }
        setDateData(allWalk)

         // might use this code later
        /*let totallCal = 0

        allWalk.forEach((meal) => {
            console.log(meal.calorie)
            totallCal = totallCal +  meal.calorie
        })

            console.log(totallCal)

        if(allWalk.length >= 1) {
            setSumDateData([{
                date: allWalk[0].date,
                calorie: totallCal
            }])
        }*/

    }, [date])

    useEffect(() => {

        const setNewGraph = () => {
            let pastWeek;
            if(!firstTime) {
                if(count !== 0) {
                    const start = (count) * 7 
                    const end = start + 7
                    setWeek(getWeek(start,end))
                    pastWeek = getWeek(start, end)
                } else if(count === 0) {
                    setWeek(getWeek(0,7))
                    pastWeek = getWeek(0,7)
                }


                for(let i = 0; i < 7; i++) { 
                    const date = pastWeek[i]
                    
                    for(let y = 0; y < data.length; y++) { 
                        const mealDate = data[y].date.slice(0, 10)
                        if(date === mealDate) {
                            allWalkData.push({
                                date: mealDate,
                                minute: data[y].minute,
                                distance: data[y].distance,
                                name: data[y].name
                            })
                            
                        }
                    }

                }
                setWeekData(allWalkData);

                getAvgWalk(sumUpTime(allWalkData)) 
            }
                

                
        }


        setNewGraph()

    }, [count])


    

    return (
        <div>
            <h2>Activity Tracker</h2>
            <Link to="/createwalk">Add Activity</Link>
            {<WalkDayChart 
                dateData={dateData} 
                sumDateData={sumDateData} date={date} 
                onChange={(e) => {setDate(e.target.value)}}
            />}
            <button onClick={() => {
                setFirstTime(false)
                setCount(count+1)
            }}>
                ＜
            </button>
            <button onClick={() => {
                setCount(count-1)
            }}>
                ＞
            </button>
            {graphData.length > 0  ? (
                <p>{graphData[6].date} to {graphData[0].date}</p>
            ):(
                ''
            )}
            <WalkWeekChart 
                graphData={graphData} 
                test={weekData}
            />

            
        </div>
        
    )
}

export default WalkSummary;
