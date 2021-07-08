import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import MealMonthChart from '../components/charts/MealMonthChart';
import MealWeekChart from '../components/charts/MealWeekChart';
import MealDayChart from '../components/charts/MealDayChart';
import MealForm from '../components/forms/Meal';

const MealSummary = () => {
  const [allMeals, setAllMeals] = useState([]); // all allMeals from api
  const { currentUser } = useAuth();

  useEffect(() => {
    // fix this part later
    const getUid = async () => {
      const uid = currentUser.uid;
      await Axios.get('http://localhost:3001/api/meal')
        .then((response) => {
          let userData = [];
          response.data.filter((meal) => meal.uid === uid).forEach((meal) => userData.push(meal));
          setAllMeals(userData);
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
      <MealForm />
      <MealDayChart allMeals={allMeals} />
      <MealWeekChart allMeals={allMeals} />
      <MealMonthChart allMeals={allMeals} />
    </div>
  );
};

export default MealSummary;
