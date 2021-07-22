import React, { useState } from 'react';
import MealMonthChart from '../components/charts/MealMonthChart';
import MealWeekChart from '../components/charts/MealWeekChart';
import MealDayChart from '../components/charts/MealDayChart';
import MealForm from '../components/forms/Meal';
import MealSummaryIntro from '../components/intros/MealSummary';

export default function MealSummary({ petProfile, allMeals, setAllMeals, MER }) {
  const [showForm, setShowForm] = useState(false);
  const [showWeekGraph, setShowWeekGraph] = useState(true); // if true, week graph appears, if false, month graph appears

  return (
    <>
      <MealSummaryIntro />

      <div className="body">
        <div className={`modal ${showForm ? 'isActive overlay' : ''}`}>
          {showForm && (
            <MealForm petProfile={petProfile} setAllMeals={setAllMeals} closeForm={() => setShowForm(false)} />
          )}
        </div>

        <div className="bg-primary-meat">
          <div className="wrapper">
            <h2>Meal Summary</h2>

            <div className="bg-primary-light meal-summary">
              <div class="basic-info">
                <div className="pet-image-name-wrapper">
                  {/* if there is no pet img uploaded, use default img */}
                  {petProfile.image ? (
                    <image className="pet-image" src={petProfile.image} />
                  ) : (
                    <p className="pet-image">default image</p>
                  )}
                  {petProfile.name ? (
                    <p className="pet-name">{petProfile.name}</p>
                  ) : (
                    <p>Please create your pet profile</p>
                  )}
                </div>

                {/* Warning to be implemented in case there is no pet registered */}
                {petProfile.name && (
                  <button className="add-button btn-contained" onClick={() => setShowForm(true)}>
                    Add Meal
                  </button>
                )}
              </div>

              <div className="graphs">
                <h3 className="graph-title">Weekly/Monthly Charts</h3>
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
          </div>
        </div>

        <MealDayChart allMeals={allMeals} MER={MER} />
      </div>
    </>
  );
}
