import MealMonthChart from '../components/charts/MealMonthChart';
import MealWeekChart from '../components/charts/MealWeekChart';
import MealDayChart from '../components/charts/MealDayChart';
import MealForm from '../components/forms/Meal';

export default function MealSummary({ petProfile, allMeals, setAllMeals, MER }) {
  return (
    <div>
      <h2>Meal Tracker</h2>
      {!petProfile.name ? (
        <p>Please create your pet profile</p>
      ) : (
        <MealForm petProfile={petProfile} setAllMeals={setAllMeals} />
      )}
      <MealDayChart allMeals={allMeals} MER={MER} />
      <MealWeekChart allMeals={allMeals} MER={MER} />
      <MealMonthChart allMeals={allMeals} MER={MER} />
    </div>
  );
}
