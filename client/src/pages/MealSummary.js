import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import MealWeekChart from '../components/charts/MealWeekChart';
import MealDayChart from '../components/charts/MealDayChart';


  

const MealSummary = () => {

    const [data, setData] = useState([]) // all data from api
    const { currentUser } = useAuth();




    useEffect(() => {
        const getUid = async () => {
            const uid = currentUser.uid;
            await Axios.get('http://localhost:3001/api/meal')
            .then((response) => {
                let userData = []
                for(let i = 0; i < response.data.length; i++) {
                    if(response.data[i].uid === uid) {
                        userData.push(response.data[i])
                    } 
                }
                setData(userData)
            })


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

   



    
//first time
//count
    

    return (
        <div>
            <h2>Meal Tracker</h2>
            <Link to="/createmeal">Add Meal</Link>
            <MealDayChart data={data} />
            <MealWeekChart 
                data={data}
            />

            
        </div>
        
    )
}

export default MealSummary;
