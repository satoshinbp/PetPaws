import { Link } from 'react-router-dom';
import LatestCalorieSummary from '../components/charts/LatestCalorieSummary';
import LatestWalkSummary from '../components/charts/LatestWalkSummary';

const Dashboard = ({ petProfile, allMeals, allActivities, MER, age }) => {
  return (
    <div className="dashboard">
      <div className="intro">
        <h3>Dashboard</h3>
        <p>
          A nutritious, balanced diet is essential to keeping your dog healthy. We provide a feature that allows you to
          keep track of your pet's meals. Additionally, we offer the ideal nutrition for your pet's weight control.
        </p>
      </div>
      <div className="latest-summary">
        <div className="latest-summary-content">
          <h3>Pet Details</h3>
          <div className="pet-details">
            <p>Pet Name</p>
            <p className="pet-detail">{petProfile.name} </p>
            <p>Age</p>
            <p className="pet-detail">{age} </p>
            <p>Breed</p>
            <p className="pet-detail">{petProfile.breed}</p>
            <p>Weight</p>
            <p className="pet-detail">{petProfile.weight}kg</p>
            <p>Height</p>
            <p className="pet-detail">{petProfile.height}cm</p>
          </div>
          <h3>In Last Week</h3>
          <LatestWalkSummary allActivities={allActivities} />
          <LatestCalorieSummary allMeals={allMeals} MER={MER} />

          {/* <h3>Nutrition Summary</h3>
        <Link to="/mealsummary">Discover More</Link>
        <br></br>
        <h3>Activity Summary</h3>
        <Link to="/walksummary">Discover More</Link> */}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
