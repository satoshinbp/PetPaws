import { Link } from 'react-router-dom';
import LatestCalorieSummary from '../components/charts/LatestCalorieSummary';
import LatestWalkSummary from '../components/charts/LatestWalkSummary';
import MealWeekChart from '../components/charts/MealWeekChart';
import MealMonthChart from '../components/charts/MealMonthChart';
import WalkWeekChart from '../components/charts/WalkWeekChart';
import WalkMonthChart from '../components/charts/WalkMonthChart';

const Dashboard = ({ petProfile, allMeals, allActivities, MER, age }) => {
  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Pet Details</h3>
      <div>
        <div>
          <p>Pet Name: {petProfile.name} </p>
          <p>Age: {age} </p>
          <p>Breed: {petProfile.breed}</p>
          <p>Weight: {petProfile.weight}kg</p>
          <p>Height: {petProfile.height}cm</p>
        </div>
      </div>
      <h3>In Last 7 Days</h3>
      <LatestCalorieSummary allMeals={allMeals} MER={MER} />
      <LatestWalkSummary allActivities={allActivities} />
      <h3>Nutrition Summary</h3>
      <MealWeekChart allMeals={allMeals} MER={MER} />
      <MealMonthChart allMeals={allMeals} MER={MER} />
      <Link to="/mealsummary" MER={MER}>
        Discover More
      </Link>
      <br></br>
      <h3>Activity Summary</h3>
      <WalkWeekChart allActivities={allActivities} />
      <WalkMonthChart allActivities={allActivities} />
      <Link to="/walksummary" MER={MER}>
        Discover More
      </Link>
    </div>
  );
};
export default Dashboard;
