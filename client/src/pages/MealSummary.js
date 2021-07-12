import MealMonthChart from '../components/charts/MealMonthChart';
import MealWeekChart from '../components/charts/MealWeekChart';
import MealDayChart from '../components/charts/MealDayChart';
import MealForm from '../components/forms/Meal';

export default function MealSummary({ petProfile, allMeals, setAllMeals }) {
  console.log(petProfile.name);
  return (
    <div>
      <h2>Meal Tracker</h2>
      {!petProfile.name ? (
        <p>Please create your pet profile</p>
      ) : (
        <MealForm petProfile={petProfile} setAllMeals={setAllMeals} />
      )}
      <MealDayChart allMeals={allMeals} />
      <MealWeekChart allMeals={allMeals} />
      <MealMonthChart allMeals={allMeals} />
    </div>
  );
}
