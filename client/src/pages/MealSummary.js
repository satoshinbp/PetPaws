import { useState, useEffect } from 'react';
import Axios from 'axios';
import MealMonthChart from '../components/charts/MealMonthChart';
import MealWeekChart from '../components/charts/MealWeekChart';
import MealDayChart from '../components/charts/MealDayChart';
import MealForm from '../components/forms/Meal';

export default function MealSummary({ petProfile }) {
  const [allMeals, setAllMeals] = useState([]); // all allMeals from api

  useEffect(() => {
    const getUid = async () => {
      await Axios.get(`http://localhost:3001/api/meal?pet_id=${petProfile.id}`)
        .then((res) => {
          const fetchedMeals = res.data;
          setAllMeals(fetchedMeals);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUid();
  }, []);

  return (
    <div>
      <h2>Meal Tracker</h2>
      <MealForm petProfile={petProfile} setAllMeals={setAllMeals} />
      <MealDayChart allMeals={allMeals} />
      <MealWeekChart allMeals={allMeals} />
      <MealMonthChart allMeals={allMeals} />
    </div>
  );
}
