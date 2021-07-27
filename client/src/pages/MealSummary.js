import React, { useState } from 'react';
import MealMonthChart from '../components/charts/MealMonthChart';
import MealWeekChart from '../components/charts/MealWeekChart';
import MealDayChart from '../components/charts/MealDayChart';
import MealForm from '../components/forms/Meal';
import MealSummaryIntro from '../components/intros/MealSummary';
import defaultPetImg from '../images/pet-profile-default.jpg';

export default function MealSummary({ petProfile, allMeals, setAllMeals, MER }) {
  const [showForm, setShowForm] = useState(false);
  const [showWeekGraph, setShowWeekGraph] = useState(true); // if true, week graph appears, if false, month graph appears

  return (
    <>
      <MealSummaryIntro />

      <div className="body">
        <div className="bg-primary-meat">
          <div className="wrapper">
            <h2>Meal Summary</h2>

            <div className="bg-primary-light meal-summary">
              <div className="basic-info">
                <div className="pet-image-name-wrapper">
                  {petProfile.image ? (
                    <img className="pet-image" src={petProfile.image} />
                  ) : (
                    <img className="pet-image" src={defaultPetImg} />
                  )}
                  {petProfile.name ? (
                    <p className="pet-name">{petProfile.name}</p>
                  ) : (
                    <p>Please create your pet profile</p>
                  )}
                </div>

                {petProfile.name && (
                  <button className="add-button btn-contained" onClick={() => setShowForm(true)}>
                    Add Meal
                  </button>
                )}
              </div>

              <div className="graphs">
                <h3 className="graph-title">Calorie Charts</h3>
                <div className="week-month-toggle">
                  <button
                    onClick={() => setShowWeekGraph(true)}
                    className={showWeekGraph ? 'btn-underlined' : 'button-no-accent'}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setShowWeekGraph(false)}
                    className={!showWeekGraph ? 'btn-underlined' : 'button-no-accent'}
                  >
                    Month
                  </button>
                </div>

                {showWeekGraph ? (
                  <MealWeekChart allMeals={allMeals} MER={MER} />
                ) : (
                  <MealMonthChart allMeals={allMeals} MER={MER} />
                )}

                <div className={`overlay ${showForm ? 'isActive' : ''}`}>
                  {showForm && (
                    <MealForm petProfile={petProfile} setAllMeals={setAllMeals} closeForm={() => setShowForm(false)} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <MealDayChart allMeals={allMeals} MER={MER} />
      </div>
    </>
  );
}
