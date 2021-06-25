import { useState, useEffect } from 'react'
import meals from './mealData'
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
    const [foodCal, setFoodCal] = useState([])
    const [weekData, setWeekData] = useState([])
    let newMeal = []
    console.log(weekData)

    const getFoodCal = () => {
        // this will get properly conneted with async when DB is ready
        for(let i = 0; i < 7; i++) {
            const getDate = new Date(new Date().setDate(new Date().getDate()-i)).toISOString().slice(0, 10)
            for(let i = 0; i < meals.length; i++) {
                if(getDate == meals[i].date) {
                    if(meals[i].type === 'Wet' || meals[i].type === 'Dry') {
                        const foodType = 'meal';
                        newMeal.push(
                            {date: meals[i].date,
                            type: foodType,
                            calorie: meals[i].calorie}
                        );
                        setFoodCal(newMeal)
                        // sum up only meal, treat calorie respectively from the same date

                        


                    } else {
                        const foodType = 'treat'
                        newMeal.push(
                            {date: meals[i].date,
                            type: foodType,
                            calorie: meals[i].calorie}
                        );

                        setFoodCal(newMeal)

                    }               
                }
            }
        }
    }

    const calorieData = [
        {"date":"2021-06-24","Meal": 400,"Treat":189},
        {"date":"2021-06-23","Meal": 300,"Treat":184},
        {"date":"2021-06-22","Meal": 250,"Treat":153},
        {"date":"2021-06-21","Meal": 500,"Treat":4},
        {"date":"2021-06-20","Meal": 300,"Treat":116},
        {"date":"2021-06-19","Meal": 230,"Treat":158},
        {"date":"2021-06-18","Meal": 300,"Treat":118,}
    ]

    useEffect(() => {


        getFoodCal();

        //setFoodCal(newMeal)
    }, [])

    
    



    return (

        <div style={{height: '260px'}}> {/* MUST set height to display chart */}
            {/*weekData.map((meal) => (
                <p>{meal}</p>
            ))*/}
            {/*oodCal.map((meal) => (
                <p>{meal.date}, {meal.type}, {meal.calorie}</p>
            ))*/}
            

            <ResponsiveContainer>
            <BarChart
				width={500}
				height={300}
				data={calorieData}
                margin={{left: 0 }}  // to get rid of extra space 
			>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Meal" stackId="a" barSize={15} fill="#85d6c3" />
            <Bar dataKey="Treat" stackId="a" barSize={15} fill="#363869" />
			</BarChart>
            </ResponsiveContainer>
            
        </div>
    )
}

export default MealBar;
