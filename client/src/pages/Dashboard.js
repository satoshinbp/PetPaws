import { Link } from 'react-router-dom';
import LatestCalorieSummary from '../components/charts/LatestCalorieSummary';
import LatestWalkSummary from '../components/charts/LatestWalkSummary';
import signinImg from '../images/dog-sample.jpg'; // dammy img, to be replaced
import MealWeekChart from '../components/charts/MealWeekChart';
import MealMonthChart from '../components/charts/MealMonthChart';
import WalkWeekChart from '../components/charts/WalkWeekChart';
import WalkMonthChart from '../components/charts/WalkMonthChart';

const Dashboard = ({ petProfile, allMeals, allActivities, MER, age }) => {
  return (
    <div className="dashboard">
      <div className="intro">
        <div className="intro__wrapper">
          <div className="intro__body">
            <div className="intro__text">
              <h2>Dashboard</h2>
              <p>
                A nutritious, balanced diet is essential to keeping your dog healthy. We provide a feature that allows
                you to keep track of your pet's meals. Additionally, we offer the ideal nutrition for your pet's weight
                control.
              </p>
            </div>
          </div>

          <div className="intro__img">
            <img src={signinImg} alt="member portrait" />
          </div>
        </div>
      </div>

      <div className="body dashboard-body">
        <div className="body__wrapper dashboard-body-wrapper">
          <div className="dashboard-pet-profile">
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
          </div>
          <div className="dashboard-meal-summary">
            <h3>Nutrition Summary</h3>
            <Link to="/mealsummary">Discover More</Link>
          </div>
          <div className="dashboard-walk-summary">
            <h3>Activity Summary</h3>
            <Link to="/walksummary">Discover More</Link>
          </div>
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
