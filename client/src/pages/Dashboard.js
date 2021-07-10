import { Link } from 'react-router-dom';
import LatestCalorieSummary from '../components/charts/LatestCalorieSummary';
import LatestWalkSummary from '../components/charts/LatestWalkSummary';

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
      <Link to="/mealsummary">Discover More</Link>
      <br></br>
      <h3>Activity Summary</h3>
      <Link to="/walksummary">Discover More</Link>
    </div>
  );
};
export default Dashboard;
