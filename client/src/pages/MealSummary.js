import React, { useState } from 'react';
import MealMonthChart from '../components/charts/MealMonthChart';
import MealWeekChart from '../components/charts/MealWeekChart';
import MealDayChart from '../components/charts/MealDayChart';
import MealForm from '../components/forms/Meal';
import storesVetsFinderIcon from '../images/stores-vets-finder.svg'; // dammy img, to be replaced

export default function MealSummary({ petProfile, allMeals, setAllMeals, MER }) {
  const [showForm, setShowForm] = useState(false);
  // if yes, week graph appears, if no, month graph appears
  const [showWeekGraph, setShowWeekGraph] = useState(true);
  return (
    <div className="meal-summary">
      <div className="intro">
        <h2>MEAL TRACKER</h2>
        <p>
          A nutritious, balanced diet is essential to keeping your dog healthy. We provide a feature that allows you to
          keep track of your pet's meals. Additionally, we offer the ideal nutrition for your pet's weight control.
        </p>
      </div>
      <div className="function-wrapper">
        {/* form toggled by add button */}
        {showForm ? (
          <MealForm petProfile={petProfile} setAllMeals={setAllMeals} closeForm={() => setShowForm(false)} />
        ) : (
          ''
        )}
        <div className="meal-week-month-graphs-wrapper">
          <div class="basic-info">
            <h3>MEAL SUMMARY</h3>
            {/* if there is no pet img uploaded, use default img*/}
            {petProfile.image ? (
              <image className="pet-image" src={petProfile.image} />
            ) : (
              <p className="pet-image">default image</p>
            )}
            {petProfile.name ? <p className="pet-name">{petProfile.name}</p> : <p>Please create your pet profile</p>}
            {/* if there is no pet pet pofile, warn to create profile*/}
            {petProfile.name ? (
              <button className="add-button btn-contained-yellow" onClick={() => setShowForm(true)}>
                Add Meal
              </button>
            ) : (
              <p id="form-warning">Please create your pet profile</p>
            )}
          </div>
          <div className="graphs">
            <h3>Weekly/Monthly Charts</h3>
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
        <div className="meal-day-graph-wrapper">
          <MealDayChart allMeals={allMeals} MER={MER} />
        </div>
      </div>
    </div>
  );
}
