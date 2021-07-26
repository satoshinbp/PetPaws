import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import LatestCalorieSummary from '../components/charts/LatestCalorieSummary';
import LatestWalkSummary from '../components/charts/LatestWalkSummary';
import MealWeekChart from '../components/charts/MealWeekChart';
import MealMonthChart from '../components/charts/MealMonthChart';
import WalkWeekChart from '../components/charts/WalkWeekChart';
import WalkMonthChart from '../components/charts/WalkMonthChart';
import DashboardIntro from '../components/intros/Dashboard';

const Dashboard = ({ petProfile, allMeals, allActivities, MER, age }) => {
  // if yes, week graph appears, if no, month graph appears
  const [showMealWeekGraph, setShowMealWeekGraph] = useState(true);
  const [showWalkWeekGraph, setShowWalkWeekGraph] = useState(true);

  return (
    <div className="dashboard">
      <DashboardIntro />

      <div className="body">
        <div className="dashboard-pet-profile bg-primary-fish">
          <div className="wrapper">
            <h2>Dashboard</h2>
            <div className="dashboard-pet-profile-wrapper bg-primary-light">
              <div className="dashboard-profile-container">
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
              </div>

              <div className="dashboard-profile-container">
                <p className="latest-summary-heading">In Last Week</p>
                <LatestWalkSummary allActivities={allActivities} />
                <LatestCalorieSummary allMeals={allMeals} MER={MER} />
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-summary bg-secondary-fish">
          <div className="wrapper summary-wrapper">
            <div className="dashboard-meal-summary bg-secondary-light">
              <h3>Nutrition Summary</h3>
              <div className="graphs">
                <div className="week-month-toggle">
                  <button
                    onClick={() => setShowMealWeekGraph(true)}
                    className={showMealWeekGraph ? 'btn-underlined' : 'button-no-accent'}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setShowMealWeekGraph(false)}
                    className={!showMealWeekGraph ? 'btn-underlined' : 'button-no-accent'}
                  >
                    Month
                  </button>
                </div>
                {showMealWeekGraph ? (
                  <MealWeekChart allMeals={allMeals} MER={MER} />
                ) : (
                  <MealMonthChart allMeals={allMeals} MER={MER} />
                )}
              </div>
              <Link to="/mealsummary" MER={MER}>
                <div className="button-wrapper">
                  <button className="btn-contained ">Discover More</button>
                </div>
              </Link>
            </div>

            <div className="dashboard-walk-summary bg-secondary-light">
              <h3>Activity Summary</h3>
              <div className="graphs">
                <div className="week-month-toggle">
                  <button
                    onClick={() => setShowWalkWeekGraph(true)}
                    className={showWalkWeekGraph ? 'btn-underlined' : 'button-no-accent'}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setShowWalkWeekGraph(false)}
                    className={!showWalkWeekGraph ? 'btn-underlined' : 'button-no-accent'}
                  >
                    Month
                  </button>
                </div>
                {showWalkWeekGraph ? (
                  <WalkWeekChart allActivities={allActivities} />
                ) : (
                  <WalkMonthChart allActivities={allActivities} />
                )}
              </div>
              <Link to="/walksummary" MER={MER}>
                <div className="button-wrapper">
                  <button className="btn-contained ">Discover More</button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
