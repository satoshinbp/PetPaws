import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import LatestCalorieSummary from '../components/charts/LatestCalorieSummary';
import LatestWalkSummary from '../components/charts/LatestWalkSummary';
import MealWeekChart from '../components/charts/MealWeekChart';
import MealMonthChart from '../components/charts/MealMonthChart';
import WalkWeekChart from '../components/charts/WalkWeekChart';
import WalkMonthChart from '../components/charts/WalkMonthChart';
import signinImg from '../images/dog-sample.jpg'; // dammy img, to be replaced

const Dashboard = ({ petProfile, allMeals, allActivities, MER, age }) => {
  // if yes, week graph appears, if no, month graph appears
  const [showWeekGraph, setShowWeekGraph] = useState(true);
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
          <div>
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
          </div>

          <div>
            <h3>Nutrition Summary</h3>
            <Link to="/mealsummary">Discover More</Link>
          </div>

          <div>
            <h3>Activity Summary</h3>
            <Link to="/walksummary">Discover More</Link>
          </div>
        </div>
      </div>
      <h3>In Last 7 Days</h3>
      <LatestCalorieSummary allMeals={allMeals} MER={MER} />
      <LatestWalkSummary allActivities={allActivities} />
      <div className="meal-toggle-graph">
        <h3>Nutrition Summary</h3>
        <div className="graphs">
          <div className="week-month-toggle">
            <div className="button-background btn-toggle-tab">
              <button
                onClick={() => setShowWeekGraph(true)}
                className={showWeekGraph ? 'btn-toggle-tab btn-darkened' : 'button-no-accent'}
              >
                Week
              </button>
              <button
                onClick={() => setShowWeekGraph(false)}
                className={!showWeekGraph ? 'btn-toggle-tab btn-darkened' : 'button-no-accent'}
              >
                Month
              </button>
            </div>
          </div>
          {showWeekGraph ? (
            <MealWeekChart allMeals={allMeals} MER={MER} />
          ) : (
            <MealMonthChart allMeals={allMeals} MER={MER} />
          )}
        </div>
      </div>
      <Link to="/mealsummary" MER={MER}>
        Discover More
      </Link>
      <div className="walk-toggle-graph">
        <h3>Activity Summary</h3>
        <div className="graphs">
          <div className="week-month-toggle">
            <div className="button-background btn-toggle-tab">
              <button
                onClick={() => setShowWeekGraph(true)}
                className={showWeekGraph ? 'btn-toggle-tab btn-darkened' : 'button-no-accent'}
              >
                Week
              </button>
              <button
                onClick={() => setShowWeekGraph(false)}
                className={!showWeekGraph ? 'btn-toggle-tab btn-darkened' : 'button-no-accent'}
              >
                Month
              </button>
            </div>
          </div>
          {showWeekGraph ? (
            <WalkWeekChart allActivities={allActivities} />
          ) : (
            <WalkMonthChart allActivities={allActivities} />
          )}
        </div>
      </div>
      <Link to="/walksummary" MER={MER}>
        Discover More
      </Link>
    </div>
  );
};
export default Dashboard;
