import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import LatestCalorieSummary from '../components/charts/LatestCalorieSummary';
import LatestWalkSummary from '../components/charts/LatestWalkSummary';
import signinImg from '../images/dog-sample.jpg'; // dammy img, to be replaced
import MealWeekChart from '../components/charts/MealWeekChart';
import MealMonthChart from '../components/charts/MealMonthChart';
import WalkWeekChart from '../components/charts/WalkWeekChart';
import WalkMonthChart from '../components/charts/WalkMonthChart';

const Dashboard = ({ petProfile, allMeals, allActivities, MER, age }) => {
  // if yes, week graph appears, if no, month graph appears
  const [showMealWeekGraph, setShowMealWeekGraph] = useState(true);
  const [showWalkWeekGraph, setShowWalkWeekGraph] = useState(true);
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

      <div className="body">
        <div className="body__wrapper">
          <div className="dashboard-pet-profile">
            <div className="dashboard-pet-profile-wrapper">
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
          </div>
          <div className="dashboard-meal-summary">
            <h3>Nutrition Summary</h3>
            <div className="graphs">
              <div className="week-month-toggle">
                <div className="button-background btn-toggle-tab">
                  <button
                    onClick={() => setShowMealWeekGraph(true)}
                    className={showMealWeekGraph ? 'btn-toggle-tab btn-darkened' : 'button-no-accent'}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setShowMealWeekGraph(false)}
                    className={!showMealWeekGraph ? 'btn-toggle-tab btn-darkened' : 'button-no-accent'}
                  >
                    Month
                  </button>
                </div>
              </div>
              {showMealWeekGraph ? (
                <MealWeekChart allMeals={allMeals} MER={MER} />
              ) : (
                <MealMonthChart allMeals={allMeals} MER={MER} />
              )}
            </div>
            <Link to="/mealsummary" MER={MER}>
              <button className="btn-contained-yellow btn-not-fullwidth">Discover More</button>
            </Link>
          </div>
          <div className="dashboard-walk-summary">
            <h3>Activity Summary</h3>
            <div className="graphs">
              <div className="week-month-toggle">
                <div className="button-background btn-toggle-tab">
                  <button
                    onClick={() => setShowWalkWeekGraph(true)}
                    className={showWalkWeekGraph ? 'btn-toggle-tab btn-darkened' : 'button-no-accent'}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setShowWalkWeekGraph(false)}
                    className={!showWalkWeekGraph ? 'btn-toggle-tab btn-darkened' : 'button-no-accent'}
                  >
                    Month
                  </button>
                </div>
              </div>
              {showWalkWeekGraph ? (
                <WalkWeekChart allActivities={allActivities} />
              ) : (
                <WalkMonthChart allActivities={allActivities} />
              )}
            </div>
            <Link to="/walksummary" MER={MER}>
              <button className="btn-contained-yellow btn-not-fullwidth">Discover More</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
